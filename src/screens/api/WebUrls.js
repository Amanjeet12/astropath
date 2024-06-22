const WebUrls = {
  url: {
    // LOcal_URL: 'https://api.astropath.co.in/',
    // LOcal_URL: 'http:/10.0.2.2:8000/',
    LOcal_URL: 'https://dev.astropath.co.in/',
    // LOcal_URL: 'https:/astrologer.astropath.co.in/',

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

    // payment

    create_payment: 'customer/customer/create_payment_order',
    transaction_history: 'customer/customer/transaction',

    //
    requestToken: 'customer/customer/request-token',
    checkRequest: 'astrologer/astrologer/communicate-next',

    // Astrologer
    fetchAstrologer: 'customer/customer/get_all_astrologer',
    request_token: 'customer/customer/request-token',
    fetch_queue: 'customer/customer/get_astrologer_queue_length',

    // all orders
    orders: 'customer/customer/get_orders',

    // support

    support: 'customer/customer/create_support_ticket',

    // blogs

    fetch_All_blogs: 'customer/customer/fetch_all_blogs',
    fetch_Top_All_Astrologer: 'customer/customer/get_all_featured_astrologer',

    // review

    review_to_astrologer: 'customer/customer/give_review_and_rating',

    // chat history
    chat_history: 'customer/customer/get_chat_history',
    terminate_chat: 'customer/customer/terminate_chat',

    //banner
    banner: 'customer/customer/banner',

    check_status: 'customer/customer/order_status',

    //live
    live: 'customer/customer/live_astrologers',
  },
};

export default WebUrls;
