//
//  FlashLayout.swift
//  ScanM_SDK_Sample
//
//  Created by hsw on 15/04/2019.
//  Copyright © 2019 hsw. All rights reserved.
//

import UIKit

public class FlashLayout: UIView {
    
    @IBOutlet weak public var flashInfoImage: UIImageView!
    @IBOutlet weak public var flashInfoMsg: UILabel!
    
    public class func instanceFromNib() -> FlashLayout {
        return UINib(nibName: "FlashLayout", bundle: nil).instantiate(withOwner: nil, options: nil)[0] as! FlashLayout
    }
    
    override public func awakeFromNib() {
        super.awakeFromNib()
    }
}
