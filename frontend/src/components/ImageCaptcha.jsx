import React, { useContext, useEffect } from 'react';
import { svgToDataUrl } from '../utils';
import { LuRefreshCw } from 'react-icons/lu';
import { Context } from '../context/Context';

const ImageCaptcha = () => {
  const { captchaImg, captcha, setCaptcha, fetchCaptcha } = useContext(Context);
  const captchaDataUrl = svgToDataUrl(captchaImg);

  useEffect(() => {
    fetchCaptcha();
  }, []);
  return (
    <div className="captcha">
      <input
        type="text"
        name="captcha"
        placeholder="Enter captcha"
        value={captcha}
        onChange={(e) => setCaptcha(e.target.value)}
        required
      />
      <img
        src={captchaDataUrl}
        alt="Captcha"
        style={{ cursor: 'pointer', marginBottom: '10px' }}
      />
      <div className="refesh-captcha" onClick={fetchCaptcha}>
        <LuRefreshCw />
      </div>
    </div>
  );
};

export default ImageCaptcha;
