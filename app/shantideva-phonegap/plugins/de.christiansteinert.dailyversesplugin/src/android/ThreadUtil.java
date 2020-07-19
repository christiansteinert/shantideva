package de.christiansteinert.dailyversesplugin;

import android.os.Handler;
import android.os.Looper;

public final class ThreadUtil {
	public static void runInMainThread(Runnable r) {
		new Handler(Looper.getMainLooper()).post(r);
	}
}
