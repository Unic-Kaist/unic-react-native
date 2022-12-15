//
//  NativeMobileSDKBridge.m
//  nufutu
//
//  Created by kim junghwan on 2022/07/31.
//

#import "NativeMobileSDKBridge.h"
#import <AVFoundation/AVFoundation.h>
#import "RNScannerViewManager.h"
#import <React/RCTUIManager.h>
#import "scanm_wrapper/scanm_wrapper-Swift.h"

@interface RCT_EXTERN_MODULE(RNEventEmitter, RCTEventEmitter)

RCT_EXTERN_METHOD(supportedEvents)

@end
