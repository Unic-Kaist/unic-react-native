package com.nufutu.adapter;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.graphics.Paint;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;

import com.digimarc.dms.payload.Payload;
import com.nufutu.R;
import com.thecoder.scanm.common.util.HistoryItemData;
import com.thecoder.scanm.common.util.StringUtil;
import com.thecoder.scanm.domain.ResultMap;
import com.thecoder.scanm.service.ScannerApiBO;

import java.util.HashMap;
import java.util.List;

public class HistoryListViewAdapter extends ArrayAdapter<HistoryItemData> {
    private static final String TAG = "HistoryListViewAdapter";
    private Activity mActivity = null;
	private Context mContext = null;
	private List<HistoryItemData> mItems = null;
    private boolean isAdminDevice = false;

	public HistoryListViewAdapter(@NonNull Activity activity, @NonNull Context context, List<HistoryItemData> items)
	{
		super( context, R.layout.listview_item, items);
		this.mActivity = activity;
		this.mContext = context;
		this.mItems = items;
	}

	@SuppressWarnings( "deprecation" )
    @Override
	public @NonNull
    View getView(int position, View convertView, @NonNull ViewGroup parent)
	{
        View rowView = convertView;

        LayoutInflater inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        if ( rowView == null )
            rowView = inflater.inflate( R.layout.listview_item, parent, false);

		try
		{
            if ((mItems != null) && (mItems.size() > 0) && (position >= 0) && (position < mItems.size()))
            {
                final HistoryItemData data = mItems.get(position);

                if ((data != null) && (data.mPayloadId != null)) {
                    Payload payload = new Payload(data.mPayloadId);

                    TextView tvScanTitle = (TextView) rowView.findViewById(R.id.scanTitle);
                    TextView tvScanSubTitle = (TextView) rowView.findViewById(R.id.scanSubTitle);
                    ImageView imageView = (ImageView) rowView.findViewById(R.id.imageview);
                    CheckBox checkBox = (CheckBox)rowView.findViewById(R.id.isChecked);
                    checkBox.setEnabled(false);
                    ImageView btnDownload = (ImageView)rowView.findViewById(R.id.btnDownload);

                    checkBox.setFocusable(false);
                    if(data.isShowCheckBox) {
                        checkBox.setVisibility(View.VISIBLE);
                    } else {
                        checkBox.setVisibility(View.GONE);
                    }

                    if(data.isChecked){
                        checkBox.setChecked(true);
                        rowView.setBackgroundColor(Color.parseColor("#f1f2f2"));
                    } else {
                        checkBox.setChecked(false);
                        rowView.setBackgroundColor(Color.WHITE);
                    }

                    if ((tvScanTitle != null) && (imageView != null)){
                        tvScanTitle.setText(data.mTitle);
                        tvScanSubTitle.setText(data.mSubtitle);

                        if (data.mBitmap != null)
                            imageView.setImageBitmap(data.mBitmap);
                        else
                            imageView.setImageResource(R.drawable.icon);
                    }

                    if(data.mReadYn.equals("N")) {
                        tvScanTitle.setPaintFlags(tvScanTitle.getPaintFlags() | Paint.FAKE_BOLD_TEXT_FLAG);
                    } else {
                        tvScanTitle.setPaintFlags(tvScanTitle.getPaintFlags() &~ Paint.FAKE_BOLD_TEXT_FLAG);
                    }

                    final ResultMap dotData = checkDownloadFile(data);
                    if(dotData != null){
                        btnDownload.setVisibility(View.VISIBLE);
                        btnDownload.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                               // ((ScanMBaseActivity)mContext).attachmentsDownloadHandler(dotData.getString("dotId"), dotData, null);
                            }
                        });
                    }else{
                        btnDownload.setVisibility(View.GONE);
                        btnDownload.setVisibility(View.GONE);
                    }
                }
            }
		}catch (Exception e)		{
			Log.e( TAG, "HistoryListViewAdapter.getView", e);
		}
		return (rowView);
	}

	private ResultMap checkDownloadFile(HistoryItemData data){
	    try{
	        int dotSeq = StringUtil.trimNumber(data.mDotSeq);
	        if (dotSeq == 0)
	            return null;

            ScannerApiBO scannerApiBO = new ScannerApiBO(mActivity, mContext);
            ResultMap dotData = scannerApiBO.loadDotInfoByDotSeq(dotSeq);
            if(dotData == null)
                return null;

            List<HashMap<String, Object>> alOfflineInfo = (List<HashMap<String, Object>>)dotData.get("offlineFileInfo");
            if(alOfflineInfo == null)
                return null;

            if(dotData.getString("offlineYn").equals("Y") && alOfflineInfo.get(0).get("downloadFileYn").equals("Y")){
                return dotData;
            }else{
               return null;
            }
        }catch (Exception e){
	        Log.e(TAG, e.toString());
	        return null;
        }
    }
}