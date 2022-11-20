package de.christiansteinert.dailyversesplugin.util;

import android.os.Handler;
import android.os.Looper;

public final class ThreadUtil {
	/**
	 * Some operations must be executed in the main UI Thread.
	 * This method schedules a function to run in that thread at the next opportunity.
	 */
	public static void runInMainUiThread(Runnable r) {
		new Handler(Looper.getMainLooper()).post(r);
	}
}
