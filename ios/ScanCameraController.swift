//
//  ScanCameraController.swift
//  ScanM_SDK_Sample
//
//  Created by hsw on 2018. 6. 22..
//  Copyright © 2018년 hsw. All rights reserved.
//

import Foundation
import AVFoundation
import DMSDK
import scanm_wrapper

class ScanCameraController: ScanMBaseController, VideoCaptureReaderResultsDelegate {
  
    @IBOutlet weak var cameraView: UIView!
    @IBOutlet weak var btnFlash: UIButton!
    @IBOutlet weak var lblInfoMsg: UILabel!
    @IBOutlet weak var balloonMsg1: UIView!
        
    let flashLayout = FlashLayout.instanceFromNib()
    
    var isCameraScanOnly: Bool = true
    var isFlashOn: Bool = false      // 초기값은 온으로 진행
    var targetUrl: String = ""
    var mTimer:Timer?
    var helpCnt:Int = 1
    var helpMsgTimer:Timer?
    var balloonTimer:Timer?
    
    let downloadDialog = DownloadDialog.instanceFromNib()
    let scanLoading = ScanLoading.instanceFromNib()
    let toastString:[String] = [
            "Please keep your phone horizontal and maintain a distance or around 10cm from the object.",
            "Moving your device forwards and backwards may help you scan better.",
            "Please make sure the camera is focused on the object.",
            "Device or camera version may affect the ability to scan."
    ]
  
    override func viewDidLoad() {
        super.viewDidLoad()
        // 카메라 권한 체크
        AVCaptureDevice.requestAccess(for: AVMediaType.video) { [self] response in
            if response {
                DispatchQueue.main.async {
                    
                    /**
                     *  카메라 리더 셋팅(선택)
                     *  UserCredentials.READER_TYPE.DotOnly     DoT만 읽을 수 있도록 설정(default: 기본값이며, 별도 설정하지 않을 경우에 해당됨)
                     *  UserCredentials.READER_TYPE.DotAndQR    DoT와 QR을 모두 읽어야만 결과값을 받을 수 있도록 설정 (ex: QR+DoT를 동시에 이용한 정품인증 시)
                     *  UserCredentials.READER_TYPE.DotOrQR     DoT 또는 QR 중 먼저 읽는것에 대해 결과값을 받을 수 있도록 설정
                     */
                  self.setCameraReaderMask(readerTy: UserCredentials.READER_TYPE.DotOrQR)
                    
                  self.initializeCamera(cameraView: self.cameraView)
                }
            }else{
                //권한 비 허용시
                let toast = UIAlertController(title: "", message: "카메라 액세스 권한이 없습니다. 액세스를 허용하시겠습니까?", preferredStyle: .alert)
                toast.addAction(UIAlertAction(title: StringUtil.getLocalizedString(key: "yes"), style: .destructive, handler:{
                    (Action) -> Void in
                    let settingsURL = NSURL(string: UIApplication.openSettingsURLString)! as URL
                    if #available(iOS 10.0, *) {
                        UIApplication.shared.open(settingsURL, options: convertToUIApplicationOpenExternalURLOptionsKeyDictionary([:]), completionHandler : nil)
                    } else {
                        UIApplication.shared.openURL(settingsURL)
                    }

                }))
                toast.addAction(UIAlertAction(title: StringUtil.getLocalizedString(key: "no"), style: .cancel){(result:UIAlertAction) -> Void in
                })
                self.present(toast, animated: true, completion: nil)
            }
        }
    }
    
    override func viewWillAppear(_ animated: Bool){
        super.viewWillAppear(animated)
        
        print(">>>>>>>>>>>>>>>>>BIZ CODE: \(UserCredentials.cmpnyCd)")
        //initializeCamera(cameraView: cameraView)
        //initializeCamera(cameraView: cameraView, zoomRatio: 50)
        initializeCamera(cameraView: cameraView, zoomValue: 1, zoomType: "S")
                
        // 헬프 메시지
        helpCnt = 0
        helpMsgTimerStart()
    }
    
    override func viewWillDisappear(_ animated: Bool){
        super.viewWillDisappear(animated)
    }
    
    override func viewDidDisappear(_ animated: Bool){
        super.viewDidDisappear(animated)
        
        if let timer = helpMsgTimer {
            if(timer.isValid){
                timer.invalidate()
            }
        }
        
        if let timer = balloonTimer {
            if(timer.isValid){
                timer.invalidate()
            }
        }
    }
  
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        // background 에서 foreground로 돌아올 경우 진행 (플래시 온/오프 여부 모니터링)
        AVCaptureDevice.requestAccess(for: AVMediaType.audio) { [self] response in
            if response {
                NotificationCenter.default.addObserver(self, selector: #selector(self.willEnterForeground), name: UIApplication.willEnterForegroundNotification, object:nil)
            }
        }
    }
    
    // background 에서 foreground로 돌아올 경우 진행 (플래시 온/오프 여부 모니터링) 및 카메라 멈춤 현상 없도록 재시작
    @objc func willEnterForeground() {
        let rootVC = UIApplication.shared.keyWindow?.rootViewController
        let presentVC = rootVC?.presentedViewController
        if presentVC == nil {
            initializeCamera(cameraView: cameraView)
        }else{
            NotificationCenter.default.removeObserver(self)
        }
    }
    
    // 카메라 자원 해제
    deinit {
        if (self.videoCaptureReader != nil) {
            self.videoCaptureReader = nil
        }
        
        if (self.resolver != nil){
            self.resolver.cancelAllResolves()
            self.resolver = nil
        }
        
        unregisterNotifications()
    }
    
    /////////////////////////////////////////////////////////////////////////
    // MARK: - UI EVENT HANDLER
    // 스캔 결과 값
    override func scanResult(dotObject: DotObject) {
        super.scanResult(dotObject: dotObject)
      
        let jsonData : [String: Any] = [
          "recogType": dotObject.recogType,
          "dotSeq": dotObject.dotSeq,
          "dotTitle": dotObject.dotTitle,
          "dotId": dotObject.dotId,
          "dotSubTitle": dotObject.dotSubTitle,
          "dotDesc": dotObject.dotDesc,
          "serviceTarget": dotObject.serviceTarget,
          "readYn": dotObject.readYn,
          "contentType": dotObject.contentType,
          "actionType": dotObject.actionType,
          "fileConnectUri": dotObject.fileConnectUri,
          "displayOrientation": dotObject.displayOrientation,
          "odroidSignalYn": dotObject.odroidSignalYn,
          "qrString": dotObject.qrString,
          "addMetadataInfo": dotObject.addMetadataInfo,
          "usePasswdYn": dotObject.usePasswdYn,
          "projectNm": dotObject.projectNm,
          "sampleImgPath": dotObject.sampleImgPath,
        ] as Dictionary
      
        var jsonObj : String = ""
        do {
            let jsonCreate = try JSONSerialization.data(withJSONObject: jsonData, options: .prettyPrinted)
            jsonObj = String(data: jsonCreate, encoding: .utf8) ?? ""
        } catch {
            print(error.localizedDescription)
        }

        RNEventEmitter.emitter.sendEvent(withName: "onFinished", body: jsonObj)
    }
    
    // 기능 함수 상태 전달
    override func onStatus(statusObject: StatusObject) {
        print(">>>>>>>>>SCAN STATUS: \(statusObject.errCd): \(statusObject.errMsg)")
    }
    
    // 스캔 애니메이션 처리
    override func scanLoadingAnimating(isStart: Bool){
        super.scanLoadingAnimating(isStart: isStart)

        if isStart {
          RNEventEmitter.emitter.sendEvent(withName: "onLoading", body: isStart)
        }else{
          RNEventEmitter.emitter.sendEvent(withName: "onLoading", body: isStart)
        }
    }
    
    
    // 인식할 수 없는 컨텐츠
    override func unknownEffect(){
        super.unknownEffect()
      
        DispatchQueue.main.async {
            self.flashLayout.layer.removeAllAnimations()
            self.view.layoutSubviews()
            self.flashLayout.frame = CGRect(x: 50, y: 50, width: 174, height: 128)
            self.flashLayout.center = CGPoint(x: UIScreen.main.bounds.size.width / 2, y: UIScreen.main.bounds.size.height / 2)
            self.flashLayout.flashInfoMsg.layer.cornerRadius = 10
            self.flashLayout.flashInfoMsg.layer.masksToBounds = true
            self.flashLayout.flashInfoMsg.adjustsFontSizeToFitWidth = true
            self.view.addSubview(self.flashLayout)
            
            self.flashLayout.flashInfoImage.image = UIImage(named: "warning")
            self.flashLayout.flashInfoMsg.text = StringUtil.getLocalizedString(key: "Unknown Content")
            
            UIView.animate(withDuration: 0.0, delay:0.0, options: [.beginFromCurrentState], animations: {
                self.flashLayout.alpha = 1.0
            }, completion:{ _ in
                UIView.animate(withDuration: 3.0, animations: {
                    self.flashLayout.alpha = 0.0
                }, completion:{ _ in
                    self.flashLayout.removeFromSuperview()
                })
            })
        }
    }
    
    // download progress UI처리용
    override func downloadProgress(progress: Float){
        super.downloadProgress(progress: progress)
    }
    
    // download start ui event handler
    override func downloadProgressStart(downloadUrl: URL){
    }
    
    // 헬프 메시지
    func helpMsgTimerStart(){
        if let timer = helpMsgTimer {
            if !timer.isValid {
                helpMsgTimer = Timer.scheduledTimer(timeInterval: 5, target:self, selector: #selector(helpMsgTimerCallback), userInfo:nil, repeats: true)
            }
        } else {
            helpMsgTimer = Timer.scheduledTimer(timeInterval: 5, target:self, selector: #selector(helpMsgTimerCallback), userInfo:nil, repeats: true)
        }
    }
    
    @objc func helpMsgTimerCallback() {
        lblInfoMsg.text = toastString[helpCnt]//String(format:NSLocalizedString("scan_guide_msg_\(helpCnt)", comment:""))
        
        //self.view.layer.removeAllAnimations();
        self.lblInfoMsg.isHidden = false
        UIView.animate(withDuration: 0.0, delay:0.0, options: [.beginFromCurrentState], animations: {
            self.lblInfoMsg.alpha = 1.0
        }, completion:{ _ in
            UIView.animate(withDuration: 4.0, animations: {
                self.lblInfoMsg.alpha = 0.0
            }, completion:{ _ in
                self.lblInfoMsg.isHidden = true
            })
        })
        
        if helpCnt == 3 {   // 4
            helpCnt = 0;
        } else {
            helpCnt += 1
        }
    }
    
    // 플래시 풍선도움말 반복
    @objc func balloonTimerCallback() {
        
        self.view.layer.removeAllAnimations();
        balloonMsg1.isHidden = false
        UIView.animate(withDuration: 0.0, delay:0.0, options: [.beginFromCurrentState], animations: {
            self.balloonMsg1.alpha = 1.0
        }, completion:{ _ in
            UIView.animate(withDuration: 6.0, animations: {
                self.balloonMsg1.alpha = 0.0
            }, completion:{ _ in
                self.balloonMsg1.isHidden = true
            })
        })
    }
}

// Helper function inserted by Swift 4.2 migrator.
fileprivate func convertToUIApplicationOpenExternalURLOptionsKeyDictionary(_ input: [String: Any]) -> [UIApplication.OpenExternalURLOptionsKey: Any] {
    return Dictionary(uniqueKeysWithValues: input.map { key, value in (UIApplication.OpenExternalURLOptionsKey(rawValue: key), value)})
}
