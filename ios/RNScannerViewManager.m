//
//  RNScannerViewManager.m
//  nufutu
//
//  Created by kim junghwan on 2022/07/28.
//

#import "RNScannerViewManager.h"
#import <AVFoundation/AVFoundation.h>

@implementation RNScannerViewManager{
  UIViewController *scanCameraController;
}

RCT_EXPORT_MODULE(RNScannerView);

- (UIView *)view
{
  UIStoryboard *sb = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
  scanCameraController = [sb instantiateViewControllerWithIdentifier:@"ScanCamera"];
  scanCameraController.modalPresentationStyle = UIModalPresentationFullScreen;
  return scanCameraController.view;
}

RCT_EXPORT_METHOD(initCamera) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [scanCameraController viewWillAppear:true];
  });
};

RCT_EXPORT_METHOD(setFlashOn:(BOOL)isOn)
{
  Class captureDeviceClass = NSClassFromString(@"AVCaptureDevice");
  if (captureDeviceClass != nil) {
      AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
      if ([device hasTorch] && [device hasFlash]){
          [device lockForConfiguration:nil];
          if (isOn) {
              [device setTorchMode:AVCaptureTorchModeOn];
          } else {
              [device setTorchMode:AVCaptureTorchModeOff];
          }
          [device unlockForConfiguration];
      }
  }
};

RCT_EXPORT_METHOD(setZoomOn:(BOOL)isOn) {
  Class captureDeviceClass = NSClassFromString(@"AVCaptureDevice");
  if (captureDeviceClass != nil) {
    AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    if (isOn) {
      device.videoZoomFactor = 2.0;
    } else {
      device.videoZoomFactor = 1.0;
    }
  }
};

@end
