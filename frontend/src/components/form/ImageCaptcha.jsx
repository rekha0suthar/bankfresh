import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { svgToDataUrl } from '../../utils';
import { LuRefreshCw } from 'react-icons/lu';
import { Context } from '../../context/Context';

const Input = lazy(() => import('./Input'));

const ImageCaptcha = () => {
  const { captchaImg, captcha, setCaptcha, fetchCaptcha } = useContext(Context);
  const captchaDataUrl = svgToDataUrl(captchaImg);

  useEffect(() => {
    fetchCaptcha();
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default ImageCaptcha;
