const WebUrls = {
  url: {
    LOcal_URL: 'https://api.astropath.co.in/',
    // LOcal_URL: 'http:/10.0.2.2:8000/',

    //consumer auth url
    otp_send: 'backend/customer/otp',
    resend_otp: 'backend/customer/resendOtp',
    verify_otp: 'backend/customer/otpVerify',
    user_detail: 'customer/customer/profile',

    // kundali url
    basic_panchang: 'kundali/backend/basic_panchang',
    astro_details: 'kundali/backend/astro_details',
    manglik_report: 'kundali/backend/manglik',
    neuro_report: 'kundali/backend/numero_table',

    // horoscope
    try: 'kundali/backend/sun_sign_prediction/try',
    today_horoscope: 'kundali/backend/sun_sign_prediction/daily',
    previous_horoscope: 'kundali/backend/sun_sign_prediction/daily/previous',
    tommorrow_horoscope: 'kundali/backend/sun_sign_prediction/daily/next',
    monthly_horoscope: 'kundali/backend/horoscope_prediction/monthly',
    advanced_panchang: 'kundali/backend/advanced_panchang',

    // cart
    birth_chart: 'kundali/backend/horo_chart_image/D1',
    Chathurthamasha_Chart: 'kundali/backend/horo_chart_image/D4',
    Panchmansha_Chart: 'kundali/backend/horo_chart_image/D5',
    Chalit_Chart: 'kundali/backend/horo_chart_image/chalit',
    Navamansha_Chart: 'kundali/backend/horo_chart_image/D9',

    // planet
    planets: 'kundali/backend/planets',
    major_vdasha: 'kundali/backend/major_vdasha',
    current_dasha: 'kundali/backend/current_chardasha',

    // match
    match_birth_details: 'kundali/backend/match_birth_details',
    match_making_report: 'kundali/backend/match_making_report',
    match_manglik_report: 'kundali/backend/match_manglik_report',
    match_ashtakoot_points: 'kundali/backend/match_ashtakoot_points',

    //lal kitab

    lalkitab: 'kundali/backend/lalkitab_debts',
    lalkitab_planet: 'kundali/backend/lalkitab_planets',
  },
};

export default WebUrls;
