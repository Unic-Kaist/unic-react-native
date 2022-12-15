//
//  ScanLoading.swift
//  SCAN_M
//
//  Created by hsw on 2018. 1. 18..
//  Copyright © 2018년 The Coder. All rights reserved.
//

import UIKit

public class ScanLoading: UIView {
    
    @IBOutlet weak public var scanningImage: UIImageView!
    public var isRepeat:Bool = true
    
    public class func instanceFromNib() -> ScanLoading {
        return UINib(nibName: "ScanLoading", bundle: nil).instantiate(withOwner: nil, options: nil)[0] as! ScanLoading
    }
    
    override public func awakeFromNib() {
        super.awakeFromNib()
    }
    
    // 로딩이미지 회전
    public func rotateView(duration: Double = 1.0) {
        UIView.animate(withDuration: duration, delay: 0.0, options: .curveLinear, animations: {
            self.scanningImage.transform = self.scanningImage.transform.rotated(by: CGFloat.pi)
        }) { finished in
            if self.isRepeat {
                self.rotateView(duration: duration)
            }
        }
    }
}
