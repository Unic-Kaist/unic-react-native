//
//  BridgeObservers.h
//  nufutu
//
//  Created by kim junghwan on 2022/07/26.
//
#import <Foundation/Foundation.h>

@class NativeMobileSDKBridge;

#define kEventOnMeetingStart @"OnMeetingStart"
#define kEventOnMeetingEnd @"OnMeetingEnd"
#define kEventOnError @"OnError"

#define kErrorEventOnMaximumConcurrentVideoReached @"OnMaximumConcurrentVideoReached"
#define sVideoAtCapacityViewOnly 206

@interface BridgeObservers : NSObject
- (id)initWithBridge:(NativeMobileSDKBridge *) bridge;
@end
