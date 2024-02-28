const WebUrls = {
  url: {
    LOcal_URL: 'https://astropath.co.in/',

    //consumer auth url
    otp_send: 'backend/customer/otp',
    resend_otp: 'backend/customer/resendOtp',
    verify_otp: 'backend/customer/otpVerify',
    user_detail: 'customer/customer/profile',

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

    // match
    match_birth_details: 'kundali/backend/match_birth_details',
    match_making_report: 'kundali/backend/match_making_report',
    match_manglik_report: 'kundali/backend/match_manglik_report',
    match_ashtakoot_points: 'kundali/backend/match_ashtakoot_points',
  },
};

export default WebUrls;
