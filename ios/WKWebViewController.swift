//
//  WKWebViewController.swift
//  ScanM_SDK_Sample
//
//  Created by hsw on 19/10/2018.
//  Copyright © 2018 hsw. All rights reserved.
//

import UIKit
import WebKit
import MessageUI
import scanm_wrapper

class WKWebViewController: UIViewController ,WKUIDelegate ,WKNavigationDelegate ,MFMailComposeViewControllerDelegate, UIScrollViewDelegate,WKScriptMessageHandler {
    
    @IBOutlet var mWebView: WKWebView!
    @IBOutlet weak var btnBack: UIBarButtonItem!
    @IBOutlet weak var btnShare: UIBarButtonItem!
    @IBOutlet weak var naviToolbar: UINavigationItem!
    
    var dotTitle:String = ""
    var serviceTarget:String = ""
    var dotSeq:Int = Int()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //let fontSize:CGFloat = 17
        //let fontWeight:CGFloat = UIFont.Weight.regular.rawValue
        //let font:UIFont = UIFont.systemFont(ofSize: fontSize, weight: UIFont.Weight(rawValue: fontWeight)) //boldSystemFont(ofSize: fontSize)
        
        var url:URL
        if StringUtil.trimString(value: serviceTarget) == "" {
            serviceTarget = "http://www.thecoder.co.kr"
        }
        print(">>>>>>>>>>>>>>>>>>>>>>>>>>> \(serviceTarget), \(StringUtil.indexOf(str: serviceTarget, searchStr: "http://"))")
        
        url = URL.init(string: serviceTarget)!
        
        clear(isClear: true) // cache delete
        //if StringUtil.indexOf(str: serviceTarget, searchStr: "http") > -1 {
        let targetUrl = serviceTarget.uppercased()
        if targetUrl.starts(with: "HTTP") {
          print(">>>>>>>>>>>>>>>>>>>>urlurlurlurlurlurlurl\(url)")
            mWebView.load(URLRequest(url: url))
        }else{
            let fileUrl = URL(fileURLWithPath: serviceTarget)
            let fileFolder = fileUrl.deletingLastPathComponent()
            
            let baseUrl = URL(fileURLWithPath: fileFolder.path, isDirectory: true)
            mWebView.loadFileURL(fileUrl, allowingReadAccessTo: baseUrl)
        }
        
        mWebView.scrollView.delegate = self
        
        // NavigationBar Settings
//        navigationController?.navigationBar.barTintColor = UIColor(red: 65/255, green: 65/255, blue: 65/255, alpha: 1.0)
//        navigationController?.navigationBar.tintColor = UIColor.white
//        navigationController?.navigationBar.titleTextAttributes = [.foregroundColor:UIColor.white]
        
        naviToolbar.title = dotTitle
        statusBarHidden = false
    }
    
    deinit {
        mWebView.scrollView.delegate = nil
        mWebView.uiDelegate = nil
        mWebView.navigationDelegate = nil
    }
    
    // wkwebview 추가
    override func loadView() {
        super.loadView()
        
        let webCfg: WKWebViewConfiguration = WKWebViewConfiguration()
        let userController: WKUserContentController = WKUserContentController()
        userController.add(self, name: "callbackHandler")
        webCfg.userContentController = userController
        
        mWebView = WKWebView(frame: createWKWebViewFrame(size: self.view.frame.size), configuration: webCfg)
        mWebView.uiDelegate = self
        mWebView.navigationDelegate = self
        
        self.view.addSubview(self.mWebView!)
    }
    
    var statusBarHidden: Bool = true {
        didSet {
            UIView.animate(withDuration: 0.0) { () -> Void in
                self.setNeedsStatusBarAppearanceUpdate()
            }
        }
    }
    
    // statusBar hidden
    override var prefersStatusBarHidden: Bool {
        return statusBarHidden
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        mWebView.scrollView.delegate = self
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        mWebView.scrollView.delegate = nil
        mWebView.uiDelegate = nil
        mWebView.navigationDelegate = nil
    }
    
    // status bar color change
    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }
    
    // WKWebView javascript
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        
    }
    
    func clear(isClear: Bool){
        if(isClear){
            clearCache()
        }
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        
    }
    
    fileprivate func clearCache() {
        URLCache.shared.removeAllCachedResponses()
        URLCache.shared.diskCapacity = 0
        URLCache.shared.memoryCapacity = 0
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func btnCloseActionHandler(_ sender: Any) {
        backButtonEvent()
    }
    
    func backButtonEvent()->Void {
      print(">>>>>>>>>SCAN backButtonEventbackButtonEventbackButtonEventbackButtonEvent")
        if mWebView.canGoBack {
            mWebView.goBack()
        } else {
            naviToolbar.title = ""
            
            self.dismiss(animated: true, completion: nil)
        }
    }
    
    @IBAction func shareBtn(_ sender: Any) {
        
        let text = dotTitle + "\n" + serviceTarget
        let textToShare = [text]
        //  액티비티 뷰 컨트롤러 셋업
        let activityVC = UIActivityViewController(activityItems: textToShare, applicationActivities: nil)
        //activityVC.excludedActivityTypes = []
        
        self.present(activityVC, animated: true, completion: nil)
        
    }
    
    // download progress UI처리용
    func downloadProgress(progress: Float){
        
    }
    
    // download start ui event handler
    func downloadProgressStart(downloadUrl: String){
        
    }
    
    func createWKWebViewFrame(size: CGSize) -> CGRect {
        var statusBarHeight:CGFloat
        let statusBarRect = UIApplication.shared.statusBarFrame
        if #available(iOS 13.0, *) {
            
            statusBarHeight = view.window?.windowScene?.statusBarManager?.statusBarFrame.height ?? 0
        } else {
            let statusBar = UIApplication.shared.value(forKeyPath: "statusBarWindow.statusBar") as? UIView
            if statusBar != nil {
                statusBarHeight = (statusBar?.frame.size.height)!
            }else{
                statusBarHeight = 20.0
            }
        }
        
        if self.navigationController?.isNavigationBarHidden == false {
            statusBarHeight = statusBarHeight + (self.navigationController?.navigationBar.frame.size.height)!
        }
        let height = size.height - statusBarHeight
        
        return CGRect(x: 0, y: statusBarRect.height + statusBarHeight, width: size.width, height: height)
    }
}
