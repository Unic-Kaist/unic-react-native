//
//  DownloadDialogUtil.swift
//  SCAN_M
//
//  Created by hsw on 2018. 1. 17..
//  Copyright © 2018년 The Coder. All rights reserved.
//

import UIKit

public class DownloadDialog: UIView {
    
    @IBOutlet weak public var progressBar: UIProgressView!
    @IBOutlet weak public var lblPercent: UILabel!
    @IBOutlet weak public var lblFileCnt: UILabel!
    
    public class func instanceFromNib() -> DownloadDialog {
        return UINib(nibName: "DownloadDialog", bundle: nil).instantiate(withOwner: nil, options: nil)[0] as! DownloadDialog
    }
    
    override public func awakeFromNib() {
        super.awakeFromNib()
    }
    
    public func updateProgress(percent: Float) {
        DispatchQueue.main.async {
            self.progressBar.setProgress(percent, animated: true)
            self.lblPercent.text = "\(percent*100)%"
        }
    }
}
