package com.cloudeasyshop;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import cn.jpush.reactnativejpush.JPushPackage;

public class MainApplication extends Application implements ReactApplication {

  private boolean SHUTDOWN_TOAST = true;
  private boolean SHUTDOWN_LOG = false;
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RCTCameraPackage(),
            new BarcodeScannerPackage(),
          new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
          new AppUpdatePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
