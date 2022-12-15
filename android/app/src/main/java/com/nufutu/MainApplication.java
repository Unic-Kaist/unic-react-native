package com.nufutu;

import android.app.Application;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
import com.nufutu.nativebridge.NativeMobileSDKBridgePackage;
import com.nufutu.newarchitecture.MainApplicationReactNativeHost;
import com.thecoder.scanm.common.util.CommonUtil;
import com.thecoder.scanm.common.util.Credentials;
import com.thecoder.scanm.dao.ScannerManagerDBHandler;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    ScannerManagerDBHandler scannerManagerDBHandler;
    private SQLiteDatabase db = null;

    private boolean createConnection(boolean isWritableDb) {
        if(isWritableDb)
            db = scannerManagerDBHandler.getWritableDatabase();
        else
            db = scannerManagerDBHandler.getReadableDatabase();

        if(db == null)
            return false;
        return true;
    }

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          List<ReactPackage> packages = new PackageList(this).getPackages();
            packages.add(new NativeMobileSDKBridgePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  private final ReactNativeHost mNewArchitectureNativeHost =
      new MainApplicationReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);
    // initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

    // 테이블 생성하기
      if(CommonUtil.getReaderString(this, Credentials.ENTRY_IS_DATABASE_CREATE, "N").equals("N")) {
          scannerManagerDBHandler = new ScannerManagerDBHandler(this);
          if (createConnection(false)) {
              for(int i = 0; i< Credentials.TABLE_QUERY_LIST.length; i++){
                  db.execSQL(Credentials.TABLE_QUERY_LIST[i]);
              }
              CommonUtil.setReaderString(this, Credentials.ENTRY_IS_DATABASE_CREATE, "Y");
          }
      }
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.nufutu.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
