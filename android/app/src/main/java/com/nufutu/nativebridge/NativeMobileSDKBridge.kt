/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */

package com.nufutu.nativebridge

import android.graphics.Camera
import android.hardware.camera2.CameraManager
import android.util.Log
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.nufutu.nativebridge.RNScannerViewManager.Companion.myFragment


class NativeMobileSDKBridge(
    reactContext: ReactApplicationContext, private val eventEmitter: RNEventEmitter) : ReactContextBaseJavaModule(reactContext) {
    private lateinit var cameraManager: CameraManager
    private lateinit var cameraId: String
    private val mRequiredPermissions = arrayOf(
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.ACCESS_FINE_LOCATION"
    )

    companion object {
        private const val TAG = "NativeMobileSDKBridge"
    }

    override fun getName(): String {
        return "NativeMobileSDKBridge"
    }

    @ReactMethod
    fun initCamera() {
        Log.d(TAG, "Called initCamera")
        myFragment?.initializeCamera()
    }

    @ReactMethod
    fun setFlashOn(isOn: Boolean) {
        Log.d(TAG, "Create event called with name: and location: $isOn")
//        myFragment?.toggleCameraFlash()
        if (isOn) {
            myFragment?.mCamera?.setTorch(isOn)
        } else {
            myFragment?.mCamera?.setTorch(isOn)
        }
    }

    @ReactMethod
    fun setZoomOn(isOn: Boolean) {
        Log.d(TAG, "Create event called with name: and location: $isOn")
        if (isOn) {
            myFragment?.mCamera?.zoom = myFragment?.mCamera?.maxZoom!! / 10
        } else {
            myFragment?.mCamera?.zoom = 0
        }
    }
}
