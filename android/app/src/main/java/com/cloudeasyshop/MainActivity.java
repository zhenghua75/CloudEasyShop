package com.cloudeasyshop;

import com.facebook.react.ReactActivity;
import cn.jpush.android.api.JPushInterface;
import android.content.res.Resources;
import android.content.res.Configuration;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        TLSSetup.configure();
        return "CloudEasyShop";
    }
     @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }

    @Override
    public Resources getResources() {
        Resources res = super.getResources();
        Configuration conf = new Configuration();
        conf.setToDefaults();
        res.updateConfiguration(conf, res.getDisplayMetrics());
        return res;
    }
}
