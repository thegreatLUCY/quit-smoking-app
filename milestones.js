const MILESTONES = [
  {
    id: 'ms_20min',
    minutes: 20,
    icon: '❤️',
    medal: '🥉',
    en: { title: '20 Minutes', desc: 'Your heart rate and blood pressure begin to drop back to normal levels.' },
    ar: { title: '20 دقيقة', desc: 'معدل ضربات القلب وضغط الدم يبدآن بالعودة إلى المستوى الطبيعي.' }
  },
  {
    id: 'ms_8hr',
    minutes: 480,
    icon: '🫁',
    medal: '🥉',
    en: { title: '8 Hours', desc: 'Carbon monoxide levels in your blood drop. Oxygen levels return to normal.' },
    ar: { title: '8 ساعات', desc: 'مستوى أول أكسيد الكربون في الدم ينخفض. مستويات الأكسجين تعود للطبيعي.' }
  },
  {
    id: 'ms_24hr',
    minutes: 1440,
    icon: '🫀',
    medal: '🥉',
    en: { title: '24 Hours', desc: 'Your risk of heart attack begins to decrease.' },
    ar: { title: '24 ساعة', desc: 'خطر الإصابة بنوبة قلبية يبدأ بالانخفاض.' }
  },
  {
    id: 'ms_48hr',
    minutes: 2880,
    icon: '👃',
    medal: '🥈',
    en: { title: '48 Hours', desc: 'Nerve endings start regrowing. Your sense of taste and smell begin to improve.' },
    ar: { title: '48 ساعة', desc: 'النهايات العصبية تبدأ بالنمو مجدداً. حاسة التذوق والشم تتحسن.' }
  },
  {
    id: 'ms_72hr',
    minutes: 4320,
    icon: '🌬️',
    medal: '🥈',
    en: { title: '72 Hours', desc: 'Bronchial tubes relax. Breathing becomes easier. Lung capacity increases.' },
    ar: { title: '72 ساعة', desc: 'القصبات الهوائية تسترخي. التنفس يصبح أسهل. سعة الرئتين تزداد.' }
  },
  {
    id: 'ms_1wk',
    minutes: 10080,
    icon: '💪',
    medal: '🥈',
    en: { title: '1 Week', desc: 'The worst withdrawal symptoms are behind you. Your body is adjusting to being nicotine-free.' },
    ar: { title: 'أسبوع واحد', desc: 'أسوأ أعراض الانسحاب أصبحت خلفك. جسمك يتكيف مع الحياة بدون نيكوتين.' }
  },
  {
    id: 'ms_2wk',
    minutes: 20160,
    icon: '🏃',
    medal: '🥇',
    en: { title: '2 Weeks', desc: 'Circulation improves. Walking and exercise become easier. Lung function increases up to 30%.' },
    ar: { title: 'أسبوعان', desc: 'الدورة الدموية تتحسن. المشي والتمارين تصبح أسهل. وظيفة الرئة تزداد حتى 30%.' }
  },
  {
    id: 'ms_1mo',
    minutes: 43200,
    icon: '🛡️',
    medal: '🥇',
    en: { title: '1 Month', desc: 'Cilia in your lungs start recovering, reducing infection risk. Energy levels increase significantly.' },
    ar: { title: 'شهر واحد', desc: 'الأهداب في رئتيك تبدأ بالتعافي مما يقلل خطر العدوى. مستويات الطاقة تزداد بشكل ملحوظ.' }
  },
  {
    id: 'ms_3mo',
    minutes: 129600,
    icon: '🌱',
    medal: '🥇',
    en: { title: '3 Months', desc: 'Circulation has greatly improved. Lung function continues to increase. Coughing and shortness of breath decrease.' },
    ar: { title: '3 أشهر', desc: 'الدورة الدموية تحسنت بشكل كبير. وظيفة الرئة تستمر بالتحسن. السعال وضيق التنفس ينخفضان.' }
  },
  {
    id: 'ms_6mo',
    minutes: 259200,
    icon: '⭐',
    medal: '🏆',
    en: { title: '6 Months', desc: 'Sinus congestion and fatigue have decreased. You feel more energetic than ever.' },
    ar: { title: '6 أشهر', desc: 'احتقان الجيوب الأنفية والتعب انخفضا. تشعر بطاقة أكبر من أي وقت مضى.' }
  },
  {
    id: 'ms_1yr',
    minutes: 525600,
    icon: '🎉',
    medal: '🏆',
    en: { title: '1 Year', desc: 'Your risk of coronary heart disease is now half that of a smoker. You\'ve saved a significant amount of money!' },
    ar: { title: 'سنة واحدة', desc: 'خطر الإصابة بأمراض القلب التاجية أصبح نصف خطر المدخن. لقد وفّرت مبلغاً كبيراً!' }
  },
  {
    id: 'ms_5yr',
    minutes: 2628000,
    icon: '🌟',
    medal: '🏆',
    en: { title: '5 Years', desc: 'Risk of stroke drops to that of a non-smoker. Risk of many cancers is cut in half.' },
    ar: { title: '5 سنوات', desc: 'خطر السكتة الدماغية ينخفض ليعادل غير المدخن. خطر العديد من السرطانات ينخفض للنصف.' }
  },
  {
    id: 'ms_10yr',
    minutes: 5256000,
    icon: '👑',
    medal: '👑',
    en: { title: '10 Years', desc: 'Risk of lung cancer drops to about half that of a smoker. Risk of other cancers decreases significantly.' },
    ar: { title: '10 سنوات', desc: 'خطر سرطان الرئة ينخفض لنصف خطر المدخن تقريباً. خطر السرطانات الأخرى ينخفض بشكل كبير.' }
  }
];

const ACHIEVEMENTS = [
  { id: 'ach_first_hour', icon: '⏰', minutes: 60, en: { name: 'First Hour', req: 'Survive 1 hour' }, ar: { name: 'الساعة الأولى', req: 'اجتز ساعة واحدة' }},
  { id: 'ach_half_day', icon: '🌅', minutes: 720, en: { name: 'Half Day Hero', req: 'Survive 12 hours' }, ar: { name: 'بطل نصف يوم', req: 'اجتز 12 ساعة' }},
  { id: 'ach_first_day', icon: '🌟', minutes: 1440, en: { name: 'Day One Done', req: 'Complete 1 full day' }, ar: { name: 'اليوم الأول', req: 'أكمل يوماً كاملاً' }},
  { id: 'ach_3_days', icon: '🔥', minutes: 4320, en: { name: 'Triple Threat', req: 'Survive 3 days' }, ar: { name: 'التهديد الثلاثي', req: 'اجتز 3 أيام' }},
  { id: 'ach_1_week', icon: '🗓️', minutes: 10080, en: { name: 'Week Warrior', req: 'Complete 1 week' }, ar: { name: 'محارب الأسبوع', req: 'أكمل أسبوعاً' }},
  { id: 'ach_2_weeks', icon: '💎', minutes: 20160, en: { name: 'Fortnight Fighter', req: 'Complete 2 weeks' }, ar: { name: 'مقاتل الأسبوعين', req: 'أكمل أسبوعين' }},
  { id: 'ach_1_month', icon: '🏅', minutes: 43200, en: { name: 'Monthly Master', req: 'Complete 1 month' }, ar: { name: 'سيد الشهر', req: 'أكمل شهراً' }},
  { id: 'ach_100_cigs', icon: '💯', minutes: -1, type: 'cigs', count: 100, en: { name: 'Century Club', req: 'Avoid 100 cigarettes' }, ar: { name: 'نادي المئة', req: 'تجنب 100 سيجارة' }},
  { id: 'ach_500_cigs', icon: '🎯', minutes: -1, type: 'cigs', count: 500, en: { name: 'Sharp Shooter', req: 'Avoid 500 cigarettes' }, ar: { name: 'القنّاص', req: 'تجنب 500 سيجارة' }},
  { id: 'ach_50_saved', icon: '💵', minutes: -1, type: 'money', count: 50, en: { name: 'Fifty Saver', req: 'Save 50 EGP' }, ar: { name: 'موفّر الخمسين', req: 'وفّر 50 ج.م' }},
  { id: 'ach_200_saved', icon: '💰', minutes: -1, type: 'money', count: 200, en: { name: 'Money Bags', req: 'Save 200 EGP' }, ar: { name: 'كنز المال', req: 'وفّر 200 ج.م' }},
  { id: 'ach_5_cravings', icon: '🧠', minutes: -1, type: 'cravings', count: 5, en: { name: 'Mind Over Matter', req: 'Resist 5 cravings' }, ar: { name: 'قوة الإرادة', req: 'قاوم 5 رغبات' }},
  { id: 'ach_20_cravings', icon: '🦾', minutes: -1, type: 'cravings', count: 20, en: { name: 'Iron Will', req: 'Resist 20 cravings' }, ar: { name: 'إرادة حديدية', req: 'قاوم 20 رغبة' }},
  { id: 'ach_3_months', icon: '🏆', minutes: 129600, en: { name: 'Quarter Champ', req: 'Complete 3 months' }, ar: { name: 'بطل الربع', req: 'أكمل 3 أشهر' }},
  { id: 'ach_6_months', icon: '👑', minutes: 259200, en: { name: 'Half Year Hero', req: 'Complete 6 months' }, ar: { name: 'بطل نصف السنة', req: 'أكمل 6 أشهر' }},
  { id: 'ach_1_year', icon: '🎖️', minutes: 525600, en: { name: 'Legendary', req: 'Complete 1 year' }, ar: { name: 'أسطوري', req: 'أكمل سنة كاملة' }},
];

const CRAVING_TIPS = {
  en: [
    "Take 10 deep breaths. Inhale for 4 seconds, hold for 4, exhale for 4.",
    "Drink a full glass of cold water right now.",
    "Go for a short walk, even just around the room.",
    "Chew some gum or eat a crunchy snack.",
    "Text or call someone you care about.",
    "Do 20 jumping jacks or push-ups.",
    "Brush your teeth — the fresh taste helps!",
    "Squeeze a stress ball or fidget with something.",
    "Look at your savings counter — every cigarette not smoked is money earned.",
    "Remember: this craving WILL pass in a few minutes.",
    "Visualize your lungs healing right now.",
    "Think of someone you love and why you're doing this.",
  ],
  ar: [
    "خذ 10 أنفاس عميقة. استنشق لمدة 4 ثوانٍ، احبس 4، أخرج الهواء 4.",
    "اشرب كوب ماء بارد الآن.",
    "امشِ قليلاً، حتى لو حول الغرفة.",
    "امضغ علكة أو تناول وجبة خفيفة مقرمشة.",
    "أرسل رسالة أو اتصل بشخص تحبه.",
    "قم بـ 20 تمرين قفز أو ضغط.",
    "اغسل أسنانك — الطعم المنعش يساعد!",
    "اضغط على كرة توتر أو العب بشيء بين يديك.",
    "انظر إلى عداد التوفير — كل سيجارة لم تدخنها هي مال مكتسب.",
    "تذكر: هذه الرغبة ستزول خلال دقائق قليلة.",
    "تخيل رئتيك وهي تتعافى الآن.",
    "فكر بشخص تحبه ولماذا تفعل هذا.",
  ]
};
