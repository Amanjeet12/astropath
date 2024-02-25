const WebUrls = {
  url: {
    LOcal_URL: 'http://13.60.35.232:8000/',

    //consumer auth url
    otp_send: 'customer/customer/otp',
    resend_otp: 'customer/customer/resendOtp',
    verify_otp: 'customer/customer/otpVerify',

    // kundali url
    basic_panchang: 'kundali/backend/basic_panchang',
    astro_details: 'kundali/backend/astro_details',
    manglik_report: 'kundali/backend/manglik',

    // horoscope
    today_horoscope: 'kundali/backend/sun_sign_prediction/daily',
    previous_horoscope: 'kundali/backend/sun_sign_prediction/daily/previous',
    tommorrow_horoscope: 'kundali/backend/sun_sign_prediction/daily/next',
    monthly_horoscope: 'kundali/backend/horoscope_prediction/monthly',

    // cart
    lagan_chart: 'kundali/backend/horo_chart_image/03',
    marraige_chart: 'kundali/backend/horo_chart_image/02',
    life_chart: 'kundali/backend/horo_chart_image/01',

    // planet
    planets: 'kundali/backend/planets',
    major_vdasha: 'kundali/backend/major_vdasha',
  },
};

export default WebUrls;
