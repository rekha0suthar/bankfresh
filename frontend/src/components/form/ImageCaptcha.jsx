import React, { useContext, useEffect } from 'react';
import { svgToDataUrl } from '../../utils';
import { LuRefreshCw } from 'react-icons/lu';
import { Context } from '../../context/Context';
import Input from './Input';

const ImageCaptcha = () => {
  const { captchaImg, captcha, setCaptcha, fetchCaptcha } = useContext(Context);
  const captchaDataUrl = svgToDataUrl(captchaImg);

  useEffect(() => {
    fetchCaptcha();
  }, []);
  return (
    <div className="captcha">
      <Input
        placeholder="Enter captcha"
        value={captcha}
        setValue={setCaptcha}
      />
      <img src={captchaDataUrl} alt="Captcha" style={{ cursor: 'pointer' }} />
      <div className="refesh-captcha" onClick={fetchCaptcha}>
        <LuRefreshCw />
      </div>
    </div>
  );
};

export default ImageCaptcha;
