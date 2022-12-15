//
//  BridgeObservers.m
//  nufutu
//
//  Created by kim junghwan on 2022/07/26.
//

#import <Foundation/Foundation.h>
#import "BridgeObservers.h"
#import "NativeMobileSDKBridge.h"

@implementation BridgeObservers
{
  NativeMobileSDKBridge* _bridge;
}

- (id)initWithBridge: (NativeMobileSDKBridge *) bridge
{
  _bridge = bridge;
  return self;
}

@end
