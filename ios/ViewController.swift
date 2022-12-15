//
//  ViewController.swift
//  scanm-sdk-example-for-ios
//
//  Created by hsw on 09/08/2019.
//  Copyright © 2019 hsw. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        
        perform(#selector(showCameraViewController), with: nil, afterDelay: 1)
    }
    
    @objc func showCameraViewController() {
        let camera = self.storyboard?.instantiateViewController(withIdentifier: "ScanCamera") as! ScanCameraController
        camera.modalPresentationStyle = .fullScreen
        self.present(camera, animated: true, completion: nil)
    }
}

