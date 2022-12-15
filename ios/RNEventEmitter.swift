//
//  RNEventEmitter.swift
//  nufutu
//
//  Created by kim junghwan on 2022/08/04.
//

import scanm_wrapper

@objc(RNEventEmitter)
class RNEventEmitter: RCTEventEmitter {

  public static var emitter: RCTEventEmitter!

  override init() {
    super.init()
    RNEventEmitter.emitter = self
  }

  public override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  open override func supportedEvents() -> [String] {
    ["onFinished", "onLoading"]
  }
}
