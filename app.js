const axes = {
  aura: {
    name: "CLASS ENERGY",
    cnName: "课堂气场",
    left: {
      code: "I",
      name: "IGNITE",
      cnName: "燃场唤醒",
      strength: "你一进门像给全班连上 WiFi，后排刚想离线就被你点亮。",
      blind: "你太会点火，慢热学生可能还在加载，你已经讲到下一集预告。",
      action: "每节课留一次安静作答时间，让不爱举手的人也能有戏份。"
    },
    right: {
      code: "A",
      name: "ANCHOR",
      cnName: "镇场控局",
      strength: "你声音不大，但班里会自动降噪，属于不靠吼也能镇住场的人。",
      blind: "你太稳，学生可能以为今天风平浪静，结果作业和知识点都被安排了。",
      action: "关键处加一个明显钩子，别让精彩只藏在你的教案备注里。"
    }
  },
  path: {
    name: "TEACHING PATH",
    cnName: "教学路径",
    left: {
      code: "S",
      name: "SCAFFOLD",
      cnName: "搭脚手架",
      strength: "你相信流程、板书、时间轴，混乱到了你这儿都得先排队取号。",
      blind: "结构太丝滑时，学生容易变成课件里的小动画，点一下才动一下。",
      action: "留一个学生能改写流程的小岔路，让课堂别只像彩排过。"
    },
    right: {
      code: "E",
      name: "EXPLORE",
      cnName: "野路生长",
      strength: "你能把学生吐槽、临场翻车和窗外动静都拽回知识点。",
      blind: "灵感开太大时，班里会出现那种眼神：老师，我们书翻到哪页了？",
      action: "每次开完野路，补一句收口，把大家从现场拉回课本。"
    }
  },
  push: {
    name: "STUDENT PUSH",
    cnName: "学生推动",
    left: {
      code: "N",
      name: "NURTURE",
      cnName: "先接住人",
      strength: "你自带班级缓冲层，学生知道自己翻车了也还有路可走。",
      blind: "你太能共情，容易把全班的情绪快递都签收，还默认包邮。",
      action: "接住情绪后立刻给边界，不然你的电量会被悄悄用完。"
    },
    right: {
      code: "C",
      name: "CHALLENGE",
      cnName: "先戳醒人",
      strength: "你敢给标准、敢要结果，学生嘴上说累，分数和习惯已经开始动了。",
      blind: "你太会加码，学生可能分不清你是在相信他，还是又开了新副本。",
      action: "上强度前先讲清为什么，让压力有方向，不只是重量。"
    }
  },
  growth: {
    name: "GROWTH MOVE",
    cnName: "成长策略",
    left: {
      code: "P",
      name: "POLISH",
      cnName: "精修打磨",
      strength: "你能从一页作业里看出知识点、习惯、态度，以及下次会栽在哪儿。",
      blind: "你太准，学生收到反馈时会有一种被高清扫描的紧张感。",
      action: "红笔旁边放一句人话，把诊断书翻译成下一步怎么改。"
    },
    right: {
      code: "R",
      name: "RELEASE",
      cnName: "放手试错",
      strength: "你总能给学生一点空间，让半成品答案、现场尝试和真实经验先长出来。",
      blind: "你太相信生长，有时会把“该收回来重做”包装得像“再看看”。",
      action: "放手之后给一个明确复盘点，让自由真的长成能力。"
    }
  }
};

const questions = [
  {
    prompt: "上课铃一响，教室还没从课间频道切回来，你第一反应是？",
    options: [
      {
        text: "推门先来一句“上线了各位”，把后排离线用户强制拉回课堂。",
        impact: { aura: -1, path: 1, growth: 1 }
      },
      {
        text: "投影、名单、白板笔、作业本全部归位，像给教室做了一次开机自检。",
        impact: { aura: 1, path: -1, growth: -1 }
      },
      {
        text: "先扫一圈脸色：今天适合段子开场，还是小测把大家叫醒。",
        impact: { aura: -1, path: 1, push: -1 }
      }
    ]
  },
  {
    prompt: "PPT突然打不开，后排还坐着听课老师，你会？",
    options: [
      {
        text: "黑板立刻顶上，嘴上淡定：“设备休息一下，脑子别跟着休息。”",
        impact: { aura: 1, path: -1, push: 1 }
      },
      {
        text: "让学生先拿纸画本节课路线图：设备可以崩，主线不能塌。",
        impact: { aura: 1, growth: -1 }
      },
      {
        text: "把事故改成临场任务：“如果你是老师，这页你怎么救场？”",
        impact: { aura: -1, path: 1, growth: 1, push: -1 }
      }
    ]
  },
  {
    prompt: "学生回答离谱，但全班突然精神了。此刻你内心的弹幕是？",
    options: [
      {
        text: "好，流量来了。先顺着这个离谱入口，把正题悄悄绕回来。",
        impact: { aura: -1, path: 1, growth: 1 }
      },
      {
        text: "先暂停，拆一下：哪里有道理，哪里飞太远，哪里必须返航。",
        impact: { aura: 1, path: -1, growth: -1 }
      },
      {
        text: "敢说就先接住，别一棍子打没了，方向盘我慢慢掰回来。",
        impact: { growth: 1, push: -1 }
      }
    ]
  },
  {
    prompt: "批到一份字很潦草但思路有光的作业，你会写？",
    options: [
      {
        text: "思路不错，但字像刚从现场撤离。请把才华从草稿堆里捞出来。",
        impact: { growth: 1, push: 1 }
      },
      {
        text: "第2步有效，第4步漏条件。重写，不然答案比你本人还叛逆。",
        impact: { growth: -1, push: 1 }
      },
      {
        text: "圈亮点、划返工区，再写一句：你离会做只差会写，别让卷面背锅。",
        impact: { growth: -1, push: -1 }
      }
    ]
  },
  {
    prompt: "班里突然冷场，你的问题抛出去像掉进棉被里。你会？",
    options: [
      {
        text: "立刻改成举手投票，先给沉默同学一个低成本上线入口。",
        impact: { aura: -1, push: -1 }
      },
      {
        text: "安静十秒继续看着他们。别急，脑子启动也有加载条。",
        impact: { aura: 1, growth: 1, push: 1 }
      },
      {
        text: "换个问法：“如果这题出现在考试最后一页，你第一反应是什么？”",
        impact: { aura: -1, path: 1, push: 1 }
      }
    ]
  },
  {
    prompt: "领导说“这节课要有亮点”，你脑内自动生成的是？",
    options: [
      {
        text: "一条完整主线、三个关键追问、一个能截图发教研群的板书。",
        impact: { path: -1, growth: -1, aura: 1 }
      },
      {
        text: "让学生现场产出东西。别只让我发光，学生也得有点镜头。",
        impact: { path: 1, aura: -1, push: 1 }
      },
      {
        text: "亮点可以有，但我会先盯学生有没有真的学会，别把课上成展示柜。",
        impact: { push: -1, growth: 1 }
      }
    ]
  },
  {
    prompt: "学生说“老师我真的不会”，你的本能回复更像？",
    options: [
      {
        text: "不会很正常，我们先把“完全不会”切成三个“好像能试试”。",
        impact: { push: -1, path: -1, growth: 1 }
      },
      {
        text: "你不是不会，你是在逃避第一步。来，别跟第一步装不熟。",
        impact: { push: 1, growth: -1, path: -1 }
      },
      {
        text: "把你卡住的那一秒说出来，我来抓案发现场。",
        impact: { growth: -1, aura: 1, push: -1, path: 1 }
      }
    ]
  },
  {
    prompt: "备课到晚上十一点，你最可能卡在哪？",
    options: [
      {
        text: "第17页动画是不是该晚 0.3 秒出现，仪式感不能输给混乱。",
        impact: { path: -1, growth: -1 }
      },
      {
        text: "突然想到一个真实情境，开始推翻前面十页，越改越上头。",
        impact: { path: 1, aura: -1 }
      },
      {
        text: "在想明天哪句话会刺到哪个学生，然后默默把措辞调软一点。",
        impact: { push: -1, growth: 1, aura: 1 }
      }
    ]
  },
  {
    prompt: "家长问“我家孩子最近怎么样”，你更想怎么说？",
    options: [
      {
        text: "先给三条证据：作业、课堂、测验。家长群可以感性，沟通先讲事实。",
        impact: { growth: -1, path: -1, push: 1 }
      },
      {
        text: "最近他有个很小但很重要的变化，我想先讲这个，别只盯着分数脸色。",
        impact: { growth: 1, push: -1 }
      },
      {
        text: "结论先别急，我把学校里几个现场还原给您，咱别隔空猜剧情。",
        impact: { aura: 1, growth: 1, push: -1, path: 1 }
      }
    ]
  },
  {
    prompt: "课堂讨论开始跑偏，有学生已经准备把话题带去宇宙边缘。你会？",
    options: [
      {
        text: "给他一分钟发挥，然后一句“所以回到本题”精准降落。",
        impact: { aura: -1, push: 1 }
      },
      {
        text: "把跑偏写到黑板边角：先存档，主线走完再处理你这个支线任务。",
        impact: { aura: 1, path: -1, growth: -1 }
      },
      {
        text: "既然偏了就偏彻底，看它能不能拽出一个新问题。",
        impact: { aura: -1, path: 1, growth: 1 }
      }
    ]
  },
  {
    prompt: "看到学生分数大跳水，你的第一动作是？",
    options: [
      {
        text: "拆题型、拆知识点、拆失误类型，先把事故现场画成地图。",
        impact: { growth: -1, path: -1, aura: 1 }
      },
      {
        text: "找他聊两句，分数只是报警声，不一定是全部案情。",
        impact: { growth: 1, push: -1, path: 1 }
      },
      {
        text: "直接安排短平快返工路线：先别emo，能捡的分先捡回来。",
        impact: { push: 1, growth: -1, path: -1 }
      }
    ]
  },
  {
    prompt: "你设计课堂活动时，最怕哪种尴尬？",
    options: [
      {
        text: "热热闹闹二十分钟，最后只有热闹，没有学习，像开了个气氛会。",
        impact: { path: -1, growth: -1 }
      },
      {
        text: "流程完美得像说明书，学生只负责按按钮和假装点头。",
        impact: { path: 1, push: -1, growth: 1 }
      },
      {
        text: "学生玩得很开心，但我发现明天还得把今天重新讲一遍。",
        impact: { growth: -1, push: 1, aura: 1 }
      }
    ]
  },
  {
    prompt: "班里有人情绪上头，作业也不交。你会先？",
    options: [
      {
        text: "先单独聊两句，把人从情绪里捞出来，作业可以补，人不能先掉线。",
        impact: { push: -1, growth: 1 }
      },
      {
        text: "情绪我理解，规则也照旧。你可以慢一点，但不能直接人间蒸发。",
        impact: { push: 1, growth: -1 }
      },
      {
        text: "给他一个最小任务：今天先交第一题，别全补，先把学习链接重新插上。",
        impact: { push: 1, growth: 1 }
      }
    ]
  },
  {
    prompt: "学生问了一个你没准备的问题，你心里真实想法是？",
    options: [
      {
        text: "好问题，今天这节课突然刷新了隐藏关卡。",
        impact: { aura: -1, path: 1, growth: 1 }
      },
      {
        text: "先别急，我要确认这是不是披着高级外衣的偏题。",
        impact: { aura: 1, path: -1, growth: -1 }
      },
      {
        text: "我也想一想，我们把“不知道”摊在桌面上，别装全知人设。",
        impact: { aura: 1, path: 1, push: -1 }
      }
    ]
  },
  {
    prompt: "你最满意的一句课堂反馈，通常长这样：",
    options: [
      {
        text: "第一个理由成立，第二个理由在摸鱼，第三个理由值得展开。",
        impact: { growth: -1, path: -1 }
      },
      {
        text: "你刚才那句话说明脑子真的开机了，别停，顺着这个思路再往前拱。",
        impact: { growth: 1, push: 1, aura: -1 }
      },
      {
        text: "这个答案不完美，但很有出息，我们把它从半成品养到能见人。",
        impact: { growth: 1, path: 1 }
      }
    ]
  },
  {
    prompt: "公开课结束，同事问你感觉如何。你会先复盘？",
    options: [
      {
        text: "哪个环节超时，哪个追问该提前，哪里证据还不够，先把滤镜关了。",
        impact: { path: -1, growth: -1, aura: 1 }
      },
      {
        text: "学生哪一刻真的被点亮了，那一下比公开课滤镜更值钱。",
        impact: { aura: -1, growth: 1, push: -1, path: 1 }
      },
      {
        text: "我在想，如果不按公开课套路，这节课会不会更像真实课堂。",
        impact: { path: 1, aura: -1 }
      }
    ]
  },
  {
    prompt: "面对高潜力学生，你更容易变成？",
    options: [
      {
        text: "私人教练：你可以更好，所以今天别想用“差不多”糊弄过去。",
        impact: { push: 1, growth: -1 }
      },
      {
        text: "情绪保养师：跑得快也要会喘气，别把自己卷成低电量。",
        impact: { push: -1, growth: 1 }
      },
      {
        text: "任务设计师：给你一个普通作业装不下的挑战，别浪费天赋。",
        impact: { path: 1, push: 1, growth: -1 }
      }
    ]
  },
  {
    prompt: "教材这一页很干，你会怎么处理？",
    options: [
      {
        text: "先画骨架，再把干货泡开。再干也得让学生咽得下去。",
        impact: { path: -1, growth: -1, aura: 1 }
      },
      {
        text: "找个学生见过的生活现场把它拽出来，不然他们只会记住这页很难熬。",
        impact: { path: 1, aura: -1, growth: 1 }
      },
      {
        text: "承认它干，然后说：今天任务很简单，把它翻译成人话。",
        impact: { push: 1 }
      }
    ]
  },
  {
    prompt: "学生集体说“老师这题超纲了”，你会？",
    options: [
      {
        text: "不，它只是穿得比较吓人。我们把外壳拆了看里面。",
        impact: { aura: -1, path: -1, push: 1 }
      },
      {
        text: "先判断是不是真超纲。是就删，不是就把证据摆出来。",
        impact: { aura: 1, growth: -1, path: -1 }
      },
      {
        text: "让他们自己找：到底哪一步让你觉得它越界了，别只喊口号。",
        impact: { growth: -1, path: 1, push: 1 }
      }
    ]
  },
  {
    prompt: "你最想在班级里养成的空气是？",
    options: [
      {
        text: "可以错，但不能糊弄；可以慢，但每天得往前挪一点。",
        impact: { push: 1, growth: -1, path: -1 }
      },
      {
        text: "大家敢说、敢问、敢把脑子里的半成品拿出来晒一晒。",
        impact: { push: -1, aura: -1, path: 1 }
      },
      {
        text: "有秩序、有证据、有台阶，学习别靠玄学，考试别靠许愿。",
        impact: { push: 1, path: -1, aura: 1, growth: 1 }
      }
    ]
  },
  {
    prompt: "学生把你的课后建议当耳旁风，你会？",
    options: [
      {
        text: "把建议压缩成一个动作：今晚先做这一步，明天我看结果，不许已读乱回。",
        impact: { push: 1, growth: -1, path: -1 }
      },
      {
        text: "先问他为什么做不到，很多摆烂背后其实是台阶断了。",
        impact: { push: -1, growth: 1 }
      },
      {
        text: "把建议做成选择题，让他自己认领一条没那么痛苦的路。",
        impact: { path: 1, push: -1, growth: 1 }
      }
    ]
  },
  {
    prompt: "如果学生给你取外号，最可能是？",
    options: [
      {
        text: "行走的课代表：什么都安排好了，连谁没带笔都像提前知道。",
        impact: { growth: -1, aura: 1 }
      },
      {
        text: "课堂气氛组组长：一开口，后排都不好意思继续离线。",
        impact: { aura: -1, growth: 1 }
      },
      {
        text: "温柔但不好糊弄：你可以脆弱，但不能把锅甩给全世界。",
        impact: { push: 1, growth: 1 }
      }
    ]
  },
  {
    prompt: "教研组让你分享经验，你最想讲的是？",
    options: [
      {
        text: "一套能复用的课堂流程，最好同事拿走就能少熬一个夜。",
        impact: { path: -1, growth: -1, push: -1 }
      },
      {
        text: "几个现场翻车后救回来的故事，真实比“看起来很美”有用。",
        impact: { path: 1, aura: -1, growth: 1 }
      },
      {
        text: "学生那些小得差点被忽略的变化，别只听分数嗓门最大。",
        impact: { growth: 1, push: -1 }
      }
    ]
  },
  {
    prompt: "一天快结束，你看着教室里的一地事务，最后想的是？",
    options: [
      {
        text: "明天把流程再顺一遍，今天的混乱不能白白糟心。",
        impact: { path: -1, growth: -1, aura: 1 }
      },
      {
        text: "今天有个学生眼神亮了一下，行，明天还能继续上班。",
        impact: { push: -1, growth: 1, aura: 1 }
      },
      {
        text: "明天我要换一种开法，不能让日子把课上成复制粘贴。",
        impact: { path: 1, aura: -1, push: 1 }
      }
    ]
  }
];

const typeProfiles = {
  "ISCR": {
    name: "有教无类召集师",
    englishName: "THE OPEN-DOOR ORCHESTRATOR",
    kind: "教育史原型",
    figure: "孔子",
    story: "孔子的原型点是《论语·卫灵公》里的“有教无类”。这个类型能把课堂先点燃，再用清楚的秩序把不同基础、不同状态的学生拉进来：有人被点醒，有人被追问，有人被稳稳接住。",
    summary: "你擅长先把课堂空气点亮，再用规则和追问把学生带进学习状态。你讲人情，但也不太允许学生装睡、装懂、装没听见。",
    note: "系统备注：你不是爱点名，你只是坚信每个学生都值得被认真拉一把，顺便被认真管一下。",
    fitStudent: "最适合基础参差、状态忽明忽暗、需要被认真点到的学生。那种嘴上说“我都行”，其实很希望老师别放弃他的孩子，会被你一点点拎回队伍。",
    fitParent: "最喜欢你的家长，通常既希望孩子被看见，也希望规矩立得住。他们会觉得你不是只会讲大道理，而是真的能把一班人往前带。",
    share: "我测出 TeacherTI 是 ISCR｜THE OPEN-DOOR ORCHESTRATOR（有教无类召集师），原型人物是孔子。全班都能教，全班也都别想悄悄下线。"
  },
  "ISCP": {
    name: "法理追问拆题师",
    englishName: "THE SOCRATIC SPARK",
    kind: "现代名师原型",
    figure: "罗翔",
    story: "罗翔的匹配点不是“会讲段子”这么浅，而是燃场、结构、追问和打磨都很强。一个案例进去，出来时常常已经变成法律、道德和人性的三堂课。",
    summary: "你一边控场，一边拆逻辑。学生以为自己只是随口一答，后来发现已经被你带进了审题现场，还要交代证据链。",
    note: "系统备注：你最有压迫感的地方不是会问问题，是你问完真的会等答案。",
    fitStudent: "最适合爱问为什么、嘴硬但脑子转得快的学生。尤其是那种答案先飞出去、证据还没出门的孩子，在你这里会学会给观点补腿。",
    fitParent: "最喜欢你的家长，通常欣赏老师讲证据、讲边界、讲底层逻辑。他们不怕孩子被追问，反而觉得被问到卡壳也是一种清醒服务。",
    share: "我测出 TeacherTI 是 ISCP｜THE SOCRATIC SPARK（法理追问拆题师），原型人物是罗翔。别急着答，先说证据链。"
  },
  "ISNR": {
    name: "头心手修复师",
    englishName: "THE WHOLE-CHILD BUILDER",
    kind: "教育史原型",
    figure: "裴斯泰洛齐",
    story: "裴斯泰洛齐强调“头、心、手”的整体发展。这个类型会把路径搭清楚，也愿意先接住学生，再让学生在尝试里慢慢恢复学习的力气。",
    summary: "你很会把清晰步骤和情绪托举绑在一起。学生在你这里不是一张分数条，而是一个正在维修、升级、偶尔短路的人。",
    note: "系统备注：你看起来像在安慰，其实已经把返工路线、心理缓冲和下一步任务都安排好了。",
    fitStudent: "最适合情绪敏感、习惯断电、不是不会学而是经常整个人掉线的学生。你能先把人接住，再把任务拆到他愿意重新启动。",
    fitParent: "最喜欢你的家长，往往在意孩子是不是被完整地看见。他们会欣赏你不只盯分数，还能一起补习惯、补信心、补那口气。",
    share: "我测出 TeacherTI 是 ISNR｜THE WHOLE-CHILD BUILDER（头心手修复师），原型人物是裴斯泰洛齐。成绩要修，人也要修。"
  },
  "ISNP": {
    name: "万物图解工程师",
    englishName: "THE DIAGRAM ENGINE",
    kind: "现代名师原型",
    figure: "李永乐",
    story: "李永乐的匹配点是燃场表达、结构图解、入口友好和精细打磨。这个类型会把高门槛知识拆到普通人能进来，但进来之后该爬的坡一点不少。",
    summary: "你有表达欲，也有教学工程能力。学生看你一边画图一边拆细节，心里大概会想：懂是懂了，脑子也开始冒热气了。",
    note: "系统备注：你讲课不是展开知识点，是把知识点拖到黑板前做拆解直播。",
    fitStudent: "最适合一遇到抽象概念就宕机、但其实很好奇的学生。他们需要的不是再听一遍定义，而是看你把知识画成路线图。",
    fitParent: "最喜欢你的家长，会对“孩子回家居然能讲明白了”特别上头。他们觉得你最厉害的不是讲得热闹，而是把难东西讲到能复述。",
    share: "我测出 TeacherTI 是 ISNP｜THE DIAGRAM ENGINE（万物图解工程师），原型人物是李永乐。不会没关系，画到你会。"
  },
  "IENP": {
    name: "动手开荒实验家",
    englishName: "THE LAB-CLASS MAKER",
    kind: "教育史原型",
    figure: "约翰·杜威",
    story: "杜威在芝加哥创办实验学校，把学校当作检验教育思想的现场。这个类型会让学生在真实任务里试错，但不是撒手不管，而是在经验、证据和复盘中把人扶稳。",
    summary: "你的课堂很容易出现学生作品、临场表达和一点点可控混乱。你相信真实产出比完美流程更有生命力，虽然现场偶尔很像刚开工。",
    note: "系统备注：你的教室像项目组，人人都要产出，没人能只当背景板。",
    fitStudent: "最适合坐不住、手比嘴先懂、必须做点什么才有感觉的学生。让他安静听一节课很难，让他做出一个东西反而能突然开窍。",
    fitParent: "最喜欢你的家长，通常不排斥课堂有点折腾。他们会觉得作品、项目、实验和复盘都算学习，不会只问今天刷了几页题。",
    share: "我测出 TeacherTI 是 IENP｜THE LAB-CLASS MAKER（动手开荒实验家），原型人物是约翰·杜威。我的课堂不是听讲，是开工。"
  },
  "IECP": {
    name: "现实路线拆弹师",
    englishName: "THE REALITY CHECKER",
    kind: "现代名师原型",
    figure: "张雪峰",
    story: "张雪峰的匹配点是燃场、野路、直接戳醒和现实打磨。这个类型不太擅长把话说成棉花糖，更像把专业、路径和代价摊开：你可以不爱听，但最好别装没听见。",
    summary: "你相信经验、行动和后果。学生在你这里很难只坐着听鸡汤，因为你会直接把路径、代价和下一步摆桌上。",
    note: "系统备注：你不是嘴毒，你是把“以后会后悔”提前翻译成今天能听懂的人话。",
    fitStudent: "最适合迷茫、拖延、靠热血做选择但不看说明书的学生。你会把他的幻想、路径和代价摆在一张桌上，让他没法继续假装没看见。",
    fitParent: "最喜欢你的家长，偏爱老师说真话、讲现实、给路线。他们不一定喜欢鸡汤，但很吃“别绕了，下一步这么办”。",
    share: "我测出 TeacherTI 是 IECP｜THE REALITY CHECKER（现实路线拆弹师），原型人物是张雪峰。别光说热爱，先看路径和代价。"
  },
  "IENR": {
    name: "诗词段子种草机",
    englishName: "THE STORY SEEDER",
    kind: "现代名师原型",
    figure: "戴建业",
    story: "戴建业的匹配点是表达鲜活、路径野、气氛松、愿意放手让知识长出烟火气。这个类型能把冷门知识讲得像故事，学生先笑，笑完发现自己真的记住了。",
    summary: "你很会把知识讲得有烟火气。学生一开始以为在听故事，后来发现自己已经把重点记住了，还想转头讲给别人听。",
    note: "系统备注：你不是降低要求，你是在给知识加入口，里面还是正经有效成分。",
    fitStudent: "最适合对课本无感、但一听故事就上线的学生。那些觉得知识很远、很冷、很难背的孩子，会被你讲到忍不住接话。",
    fitParent: "最喜欢你的家长，通常乐意看到孩子终于愿意聊课堂内容。他们不怕课堂有笑声，只要笑完以后孩子真记住了。",
    share: "我测出 TeacherTI 是 IENR｜THE STORY SEEDER（诗词段子种草机），原型人物是戴建业。看似在笑，实际在学。"
  },
  "IECR": {
    name: "世界观开机人",
    englishName: "THE WAKE-UP CATALYST",
    kind: "教育史原型",
    figure: "保罗·弗莱雷",
    story: "弗莱雷的教育思想强调对话、问题提出和批判意识。这个类型会燃起讨论，也会戳醒学生去看题目背后的世界，并且敢问“为什么规则长这样”。",
    summary: "你的课堂有讨论、有现实感，也有一点不安分。你会把学生从标准答案旁边拉出来，问一句：这事真的只能这样吗？",
    note: "系统备注：你讲着讲着就把知识点讲成世界观更新包，学生下课还在想。",
    fitStudent: "最适合有观点、不满足于背答案、总想问“凭什么”的学生。你能把他的反叛劲儿导进思考里，而不是直接按灭。",
    fitParent: "最喜欢你的家长，愿意孩子有判断、有表达、能看见现实。他们不只想要标准答案，也希望孩子别长成自动答题机。",
    share: "我测出 TeacherTI 是 IECR｜THE WAKE-UP CATALYST（世界观开机人），原型人物是保罗·弗莱雷。答案要会，世界也要看。"
  },
  "ASNR": {
    name: "静音布阵设计师",
    englishName: "THE QUIET ARCHITECT",
    kind: "教育史原型",
    figure: "玛利亚·蒙台梭利",
    story: "蒙台梭利在“儿童之家”强调有准备的环境、材料和观察。这个类型不靠大声推动，而是把环境、材料、节奏布置到学生自己动起来。",
    summary: "你擅长把台阶藏进环境里。学生以为是自己突然开窍，其实你早把路线、材料和节奏铺到了脚边。",
    note: "系统备注：你最强的控场方式，是让别人以为没人控场，但每一步都在你的设计里。",
    fitStudent: "最适合怕吵、慢热、需要稳定环境才会进入状态的学生。他们不一定喜欢被推到聚光灯下，但很会在你布好的环境里自己长出来。",
    fitParent: "最喜欢你的家长，通常看重习惯、秩序和独立性。他们会觉得孩子在你这里不是被管住了，而是慢慢学会自己动起来。",
    share: "我测出 TeacherTI 是 ASNR｜THE QUIET ARCHITECT（静音布阵设计师），原型人物是玛利亚·蒙台梭利。看似没出手，其实全场都在布局里。"
  },
  "ASCR": {
    name: "兼容并包主理人",
    englishName: "THE PRINCIPLED PLURALIST",
    kind: "教育史原型",
    figure: "蔡元培",
    story: "蔡元培执掌北大时主张思想自由、兼容并包，同时推动制度改革。这个类型不是散漫自由派，而是能容纳差异，也能把学术标准和组织边界立起来。",
    summary: "你不会一直站在台前催，但会把目标、节奏和责任边界摆得很清楚。学生有空间，但空间旁边贴着规则。",
    note: "系统备注：你给自由，但自由旁边有截止日期和质量标准，别想空手套宽松。",
    fitStudent: "最适合兴趣广、观点多、需要空间但也需要边界的学生。你不会把他们修剪成同一种形状，但会提醒每一种自由都要交作业。",
    fitParent: "最喜欢你的家长，往往支持多元发展，但不想孩子野蛮生长。他们欣赏你既开放又有标准，宽松但不失控。",
    share: "我测出 TeacherTI 是 ASCR｜THE PRINCIPLED PLURALIST（兼容并包主理人），原型人物是蔡元培。自由可以，自觉也请同步上线。"
  },
  "ASNP": {
    name: "踮脚架桥教练",
    englishName: "THE SCAFFOLD COACH",
    kind: "教育史原型",
    figure: "列夫·维果茨基",
    story: "维果茨基提出最近发展区：学生在更有能力者帮助下能做到的那段距离，正是教学发力处。这个类型会精准搭支架，帮学生把“暂时不会”变成“踮脚能够到”。",
    summary: "你看上去安静，实际一直在估算学生还能再往前够几厘米。你的支持不是抱着走，是把桥搭好，然后让他自己过。",
    note: "系统备注：你最会说的潜台词是：我扶你，但腿还得你自己迈。",
    fitStudent: "最适合差一点就会、但总卡在第一步或最后一步的学生。你能看出他真正够不到的地方，然后只垫那一脚。",
    fitParent: "最喜欢你的家长，通常很吃方法、分层和具体反馈。他们会觉得你不是笼统说“加油”，而是知道孩子下一步该怎么加。",
    share: "我测出 TeacherTI 是 ASNP｜THE SCAFFOLD COACH（踮脚架桥教练），原型人物是列夫·维果茨基。够不着？很好，教学开始。"
  },
  "ASCP": {
    name: "燃灯硬核托举者",
    englishName: "THE LAMPBEARER DRILLMASTER",
    kind: "现代名师原型",
    figure: "张桂梅",
    story: "张桂梅的匹配点是镇场、强结构、强托举、强打磨。这个类型不是温柔地说“算了”，而是把学生从困境里往外推：我心疼你，所以我更不能让你停在这里。",
    summary: "你很能接住学生，也很敢把他们推向更高处。你的爱不是减压毯，而是一盏一直亮着、也一直催人往前走的灯。",
    note: "系统备注：你不是不近人情，你是把期待当成一种更硬的保护。心疼归心疼，题还是要做。",
    fitStudent: "最适合处境不容易、信心不够但还有一股劲儿的学生。你不会把困难浪漫化，只会把路照亮，再盯着他一步步往上走。",
    fitParent: "最喜欢你的家长，愿意信任高要求，也愿意配合吃苦。他们知道你严格不是针对孩子，而是在替孩子守住一条往上走的路。",
    share: "我测出 TeacherTI 是 ASCP｜THE LAMPBEARER DRILLMASTER（燃灯硬核托举者），原型人物是张桂梅。心疼你，所以更不能让你停在原地。"
  },
  "AENP": {
    name: "开窍瞬间捕手",
    englishName: "THE BREAKTHROUGH GUIDE",
    kind: "教育史原型",
    figure: "安妮·沙利文",
    story: "安妮·沙利文在水泵旁把“water”拼进海伦·凯勒手心，打开了语言连接。这个类型安静、灵活、细致、温暖，擅长等那个真正接通的瞬间。",
    summary: "你不急着把学生塞进标准答案。你更像一个课堂信号修复师，专门等那一下真正接通。",
    note: "系统备注：你不是慢，你是在等理解从“没反应”变成“突然懂了”。",
    fitStudent: "最适合慢热、表达通道还没打开、需要换一种入口才懂的学生。别人以为他没反应，你会继续找那个能接通的按钮。",
    fitParent: "最喜欢你的家长，通常珍惜小进步，也知道孩子不是按一下就亮的台灯。他们会很感激你愿意慢慢等、细细看。",
    share: "我测出 TeacherTI 是 AENP｜THE BREAKTHROUGH GUIDE（开窍瞬间捕手），原型人物是安妮·沙利文。别急，理解会在某一秒接通。"
  },
  "AECR": {
    name: "自由边界导航员",
    englishName: "THE BOUNDED WANDERER",
    kind: "教育史原型",
    figure: "卢梭",
    story: "卢梭在《爱弥儿》中提出顺应儿童自然发展的教育思路。这个类型会给真实情境、给空间、给挑战，但不会把每一步都嚼碎喂到嘴边。",
    summary: "你不太爱把一切讲死。你更相信学生在真实问题里碰一下、想一下、试一下，才会长出自己的判断。",
    note: "系统备注：你不是放任，你是把边界藏得比较自然。学生以为自己在走，其实路你看着呢。",
    fitStudent: "最适合自主意识强、讨厌被喂答案、需要自己探索一圈才服气的学生。你给他空间，也会在他快飞出地图时把边界亮出来。",
    fitParent: "最喜欢你的家长，支持孩子体验世界，也接受学习不总是整齐划一。他们欣赏你给自由，但更欣赏你知道自由的护栏在哪里。",
    share: "我测出 TeacherTI 是 AECR｜THE BOUNDED WANDERER（自由边界导航员），原型人物是卢梭。路可以自己走，边界我已经标好了。"
  },
  "AENR": {
    name: "树下开窗人文家",
    englishName: "THE OPEN-AIR HUMANIST",
    kind: "教育史原型",
    figure: "泰戈尔",
    story: "泰戈尔创办的圣地尼克坦把自然、艺术和人文理想带进学校生活。这个类型安静、开放、审美感强，愿意让学习保留风、光和人味。",
    summary: "你温柔、开放，也很会给学生留下表达空间。你的课堂可能不总是最快，但常常让人下课后还想一想。",
    note: "系统备注：你讲知识点时，总想顺手给教室开一扇窗，让学习有点人味。",
    fitStudent: "最适合审美敏感、内心戏多、需要表达空间的学生。他们可能不是最抢答的人，但会在你这里觉得学习终于有点人味。",
    fitParent: "最喜欢你的家长，愿意把孩子当完整的人，而不是一台考试设备。他们会喜欢你让孩子有分数，也有风、有光、有一点自己的声音。",
    share: "我测出 TeacherTI 是 AENR｜THE OPEN-AIR HUMANIST（树下开窗人文家），原型人物是泰戈尔。学习可以有分数，也可以有风。"
  },
  "AECP": {
    name: "知行合一催办人",
    englishName: "THE ACTION TRUTH-SEEKER",
    kind: "教育史原型",
    figure: "王阳明",
    story: "王阳明讲“知行合一”，不是让知识停在嘴上，而是要落到行动里。这个类型给空间、信任人的内在可能，但最后一定会问：你懂了，那你做到了吗？",
    summary: "你看重学生的声音，也看重真实行动。你的班级不是只负责表达感受的小空间，而是一个要参与、要承担、要交付的小社会。",
    note: "系统备注：你最擅长把“我知道了”升级成“那你现在做给我看”。",
    fitStudent: "最适合想法很多、表达很足、但容易停在嘴上的学生。你会欣赏他的观点，然后温柔而坚定地把他推到行动现场。",
    fitParent: "最喜欢你的家长，通常希望孩子有责任感、能承担、说到做到。他们会觉得你不是只让孩子会说，而是逼他把知道的东西活出来。",
    share: "我测出 TeacherTI 是 AECP｜THE ACTION TRUTH-SEEKER（知行合一催办人），原型人物是王阳明。懂了不算，做出来才算。"
  }
};

const personaImages = {
  ISCR: "./assets/personas/iscr-open-door-orchestrator.webp",
  ISCP: "./assets/personas/iscp-socratic-spark.webp",
  ISNR: "./assets/personas/isnr-whole-child-builder.webp",
  ISNP: "./assets/personas/isnp-diagram-engine.webp",
  IENP: "./assets/personas/ienp-lab-class-maker.webp",
  IECP: "./assets/personas/iecp-reality-checker.webp",
  IENR: "./assets/personas/ienr-story-seeder.webp",
  IECR: "./assets/personas/iecr-wake-up-catalyst.webp",
  ASNR: "./assets/personas/asnr-quiet-architect.webp",
  ASCR: "./assets/personas/ascr-principled-pluralist.webp",
  ASNP: "./assets/personas/asnp-scaffold-coach.webp",
  ASCP: "./assets/personas/ascp-lampbearer-drillmaster.webp",
  AENP: "./assets/personas/aenp-breakthrough-guide.webp",
  AECR: "./assets/personas/aecr-bounded-wanderer.webp",
  AENR: "./assets/personas/aenr-open-air-humanist.webp",
  AECP: "./assets/personas/aecp-action-truth-seeker.webp"
};

const optionLabels = ["A", "B", "C"];
const storageKey = "teacher-ti-state-v8";

const state = loadState();

const contentGrid = document.querySelector(".content-grid");
const quizView = document.querySelector("#quizView");
const resultView = document.querySelector("#resultView");
const axisPill = document.querySelector("#axisPill");
const questionText = document.querySelector("#questionText");
const optionGrid = document.querySelector("#optionGrid");
const prevButton = document.querySelector("#prevButton");
const questionMeta = document.querySelector("#questionMeta");
const progressFill = document.querySelector("#progressFill");
const typeCode = document.querySelector("#typeCode");
const typeName = document.querySelector("#typeName");
const typeCnName = document.querySelector("#typeCnName");
const matchScore = document.querySelector("#matchScore");
const personaVisual = document.querySelector(".persona-visual");
const personaImage = document.querySelector("#personaImage");
const personaLoadingNote = document.querySelector("#personaLoadingNote");
const educatorKind = document.querySelector("#educatorKind");
const educatorName = document.querySelector("#educatorName");
const educatorStory = document.querySelector("#educatorStory");
const systemNote = document.querySelector("#systemNote");
const fitStudent = document.querySelector("#fitStudent");
const fitParent = document.querySelector("#fitParent");
const strengthList = document.querySelector("#strengthList");
const blindList = document.querySelector("#blindList");
const actionList = document.querySelector("#actionList");
const scoreBars = document.querySelector("#scoreBars");
const restartButton = document.querySelector("#restartButton");
const printButton = document.querySelector("#printButton");
const shareCardModal = document.querySelector("#shareCardModal");
const sharePreviewImage = document.querySelector("#sharePreviewImage");
const shareDownloadButton = document.querySelector("#shareDownloadButton");
const shareCloseButton = document.querySelector("#shareCloseButton");
let advanceTimer = null;
let shareCardObjectUrl = null;
let shareCardFilename = "";
const imageAssetCache = new Map();
let personaWarmToken = 0;
let personaRenderToken = 0;

function loadState() {
  const fallback = {
    current: 0,
    answers: Array(questions.length).fill(null),
    showingResult: false
  };

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || !Array.isArray(saved.answers)) return fallback;
    return {
      current: Math.min(Math.max(Number(saved.current) || 0, 0), questions.length - 1),
      answers: questions.map((_, index) => {
        const value = saved.answers[index];
        return Number.isInteger(value) && value >= 0 && value <= 2 ? value : null;
      }),
      showingResult: Boolean(saved.showingResult)
    };
  } catch {
    return fallback;
  }
}

function getAnsweredCount() {
  return state.answers.filter((answer) => answer !== null).length;
}

function loadImageAsset(src) {
  if (!src) {
    return Promise.reject(new Error("图片加载失败，请稍后再试。"));
  }

  const cached = imageAssetCache.get(src);
  if (cached) return cached;

  const request = new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => {
      imageAssetCache.delete(src);
      reject(new Error("图片加载失败，请稍后再试。"));
    };
    image.src = src;
  });

  imageAssetCache.set(src, request);
  return request;
}

function setPersonaLoadingState(isLoading) {
  personaVisual.classList.toggle("is-loading", isLoading);
  personaImage.classList.toggle("is-loading", isLoading);
  if (personaLoadingNote) {
    personaLoadingNote.hidden = !isLoading;
  }
}

function networkAllowsPersonaWarmup() {
  const connection = navigator.connection;
  if (!connection) return true;
  if (connection.saveData) return false;
  return !String(connection.effectiveType || "").includes("2g");
}

function scheduleIdleTask(callback) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout: 1200 });
    return;
  }
  window.setTimeout(callback, 180);
}

function calculateRemainingAxisRange() {
  const remaining = {};
  getAxisEntries().forEach(([key]) => {
    remaining[key] = 0;
  });

  state.answers.forEach((answer, index) => {
    if (answer !== null) return;
    getAxisEntries().forEach(([key]) => {
      const maxImpact = questions[index].options.reduce(
        (max, option) => Math.max(max, Math.abs(Number(option.impact[key]) || 0)),
        0
      );
      remaining[key] += maxImpact;
    });
  });

  return remaining;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function estimateAxisRightProbability(score, remainingRange) {
  if (remainingRange <= 0) {
    const goesRight =
      score.total > 0 || (score.total === 0 && score.rightHits > score.leftHits);
    return goesRight ? 0.99 : 0.01;
  }

  if (score.total > remainingRange) return 0.99;
  if (score.total < -remainingRange) return 0.01;

  const tieBias = (score.rightHits - score.leftHits) / ((score.rightHits + score.leftHits || 0) + 2);
  const base = 0.5 + score.total / (2 * (remainingRange + 1));
  return clamp(base + tieBias * 0.08, 0.04, 0.96);
}

function estimatePersonaPriority() {
  const scores = calculateScores();
  const remaining = calculateRemainingAxisRange();
  const axisEntries = getAxisEntries();

  return Object.keys(typeProfiles)
    .map((code) => {
      let probability = 1;
      axisEntries.forEach(([key, axis], index) => {
        const rightProbability = estimateAxisRightProbability(scores[key], remaining[key]);
        const needsRight = code[index] === axis.right.code;
        probability *= needsRight ? rightProbability : 1 - rightProbability;
      });
      return { code, probability };
    })
    .sort((left, right) => right.probability - left.probability)
    .map((entry) => entry.code);
}

function preloadLikelyPersonaImage() {
  if (!getAnsweredCount()) return;
  const [likelyCode] = estimatePersonaPriority();
  loadImageAsset(personaImages[likelyCode] || personaImages.ISCR).catch(() => {});
}

function warmPersonaImages() {
  if (!networkAllowsPersonaWarmup() || !getAnsweredCount() || state.showingResult) return;

  const queue = estimatePersonaPriority()
    .slice(0, 6)
    .filter((code) => !imageAssetCache.has(personaImages[code]));
  if (!queue.length) return;

  const token = ++personaWarmToken;
  let index = 0;

  const step = () => {
    if (token !== personaWarmToken || state.showingResult || index >= queue.length) return;
    const src = personaImages[queue[index]];
    index += 1;
    loadImageAsset(src)
      .catch(() => {})
      .finally(() => {
        scheduleIdleTask(step);
      });
  };

  scheduleIdleTask(step);
}

async function showResultPersonaImage(src, alt) {
  const token = ++personaRenderToken;
  personaImage.alt = alt;
  setPersonaLoadingState(true);
  personaImage.removeAttribute("src");

  try {
    await loadImageAsset(src);
  } catch {
    imageAssetCache.delete(src);
    try {
      await loadImageAsset(src);
    } catch {
      if (token === personaRenderToken) {
        setPersonaLoadingState(false);
      }
      return;
    }
  }

  if (token !== personaRenderToken) return;
  personaImage.src = src;
  setPersonaLoadingState(false);
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function getAxisEntries() {
  return Object.entries(axes);
}

function calculateScores() {
  const scores = {};
  getAxisEntries().forEach(([key]) => {
    scores[key] = {
      total: 0,
      leftHits: 0,
      rightHits: 0,
      max: 0
    };
  });

  state.answers.forEach((answer, index) => {
    if (answer === null) return;
    const option = questions[index].options[answer];
    Object.entries(option.impact).forEach(([key, rawValue]) => {
      const value = Number(rawValue);
      if (!scores[key] || !value) return;
      scores[key].total += value;
      scores[key].max += Math.abs(value);
      if (value < 0) scores[key].leftHits += 1;
      if (value > 0) scores[key].rightHits += 1;
    });
  });

  return scores;
}

function selectedSides(scores) {
  const sides = {};
  getAxisEntries().forEach(([key, axis]) => {
    const score = scores[key];
    const goesRight =
      score.total > 0 || (score.total === 0 && score.rightHits > score.leftHits);
    sides[key] = goesRight ? axis.right : axis.left;
  });
  return sides;
}

function buildType(scores) {
  const sides = selectedSides(scores);
  return getAxisEntries()
    .map(([key]) => sides[key].code)
    .join("");
}

function calculateMatch(scores) {
  const intensity = Object.values(scores).reduce((sum, score) => sum + Math.abs(score.total), 0);
  const possible = Object.values(scores).reduce((sum, score) => sum + Math.max(score.max, 1), 0);
  return Math.min(99, 78 + Math.round((intensity / possible) * 21));
}

function renderOptions(question) {
  const selected = state.answers[state.current];
  optionGrid.innerHTML = question.options
    .map((option, index) => {
      const selectedClass = selected === index ? " is-selected" : "";
      const ariaChecked = selected === index ? "true" : "false";
      return `
        <button
          class="option-button${selectedClass}"
          type="button"
          role="radio"
          aria-checked="${ariaChecked}"
          data-value="${index}"
        >
          <span>${optionLabels[index]}</span>
          <strong>${option.text}</strong>
        </button>
      `;
    })
    .join("");
}

function renderQuiz() {
  state.showingResult = false;
  contentGrid.classList.remove("is-result-mode");
  const question = questions[state.current];
  const answeredCount = getAnsweredCount();

  quizView.hidden = false;
  resultView.hidden = true;
  axisPill.textContent = "凭第一反应，别像在写教案";
  questionText.textContent = question.prompt;
  questionMeta.textContent = `${state.current + 1} / ${questions.length}`;
  progressFill.style.width = `${(answeredCount / questions.length) * 100}%`;

  prevButton.disabled = state.current === 0;

  renderOptions(question);
  preloadLikelyPersonaImage();
  warmPersonaImages();
  saveState();
}

function renderList(element, items) {
  element.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderSystemNote(summary, note) {
  systemNote.replaceChildren();
  [summary, note].forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    systemNote.append(paragraph);
  });
}

function renderScoreBars(scores) {
  scoreBars.innerHTML = getAxisEntries()
    .map(([key, axis]) => {
      const score = scores[key];
      const max = Math.max(score.max, 1);
      const leansRight = score.total > 0;
      const side = selectedSides(scores)[key];
      const confidence = Math.max(54, Math.round(50 + (Math.abs(score.total) / max) * 50));
      const markerPosition = leansRight ? confidence : 100 - confidence;
      return `
        <div class="trait-card ${leansRight ? "is-right" : "is-left"}">
          <div class="trait-head">
            <strong>${axis.name}</strong>
            <span>${axis.cnName}</span>
          </div>
          <div class="trait-choice" aria-label="${axis.name} 倾向 ${side.name}">
            <span class="${!leansRight ? "is-active" : ""}">
              <b>${axis.left.code}</b>
              ${axis.left.name}
              <small>${axis.left.cnName}</small>
            </span>
            <span class="${leansRight ? "is-active" : ""}">
              <b>${axis.right.code}</b>
              ${axis.right.name}
              <small>${axis.right.cnName}</small>
            </span>
          </div>
          <div class="trait-track" aria-hidden="true">
            <i style="left:${markerPosition}%;"></i>
          </div>
          <div class="trait-result">
            <span>${side.code} ${side.name}</span>
            <strong>${confidence}%</strong>
          </div>
        </div>
      `;
    })
    .join("");
}

function drawRoundRect(ctx, x, y, width, height, radius = 16) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPanel(ctx, x, y, width, height, options = {}) {
  const {
    fill = "#fffdf3",
    stroke = "#171717",
    shadow = true,
    radius = 18,
    lineWidth = 5
  } = options;

  if (shadow) {
    ctx.fillStyle = "#171717";
    drawRoundRect(ctx, x + 10, y + 10, width, height, radius);
    ctx.fill();
  }

  ctx.fillStyle = fill;
  drawRoundRect(ctx, x, y, width, height, radius);
  ctx.fill();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = stroke;
  ctx.stroke();
}

function setCanvasFont(ctx, size, weight = 800) {
  ctx.font = `${weight} ${size}px Inter, "PingFang SC", "Microsoft YaHei", Arial, sans-serif`;
  ctx.textBaseline = "top";
}

function wrapCanvasText(ctx, text, maxWidth) {
  const lines = [];
  const paragraphs = String(text).split("\n");

  paragraphs.forEach((paragraph, paragraphIndex) => {
    let line = "";
    Array.from(paragraph).forEach((char) => {
      const next = line + char;
      if (line && ctx.measureText(next).width > maxWidth) {
        lines.push(line);
        line = char.trimStart();
        return;
      }
      line = next;
    });

    if (line) lines.push(line);
    if (paragraphIndex < paragraphs.length - 1) lines.push("");
  });

  return lines;
}

function drawWrappedCanvasText(ctx, text, x, y, maxWidth, lineHeight, options = {}) {
  const {
    size = 30,
    weight = 800,
    color = "#171717",
    maxLines = Infinity
  } = options;
  setCanvasFont(ctx, size, weight);
  ctx.fillStyle = color;
  let lines = wrapCanvasText(ctx, text, maxWidth);

  if (Number.isFinite(maxLines) && lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[，。,.!！?？、；;：:]?$/, "")}...`;
  }

  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });

  return y + lines.length * lineHeight;
}

function measureWrappedCanvasText(ctx, text, maxWidth, lineHeight, options = {}) {
  setCanvasFont(ctx, options.size || 30, options.weight || 800);
  return wrapCanvasText(ctx, text, maxWidth).length * lineHeight;
}

function ensureImageReady(image) {
  if (image.complete && image.naturalWidth > 0) return Promise.resolve();
  return new Promise((resolve, reject) => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", reject, { once: true });
  });
}

function getCurrentResultData() {
  const scores = calculateScores();
  const sides = selectedSides(scores);
  const code = buildType(scores);
  const profile = typeProfiles[code] || typeProfiles.ISCR;
  const match = calculateMatch(scores);
  return { scores, sides, code, profile, match };
}

function drawScreenshotCard(ctx, title, body, x, y, width, fill) {
  const padding = 26;
  const titleHeight = 34;
  const bodyHeight = measureWrappedCanvasText(ctx, body, width - padding * 2, 38, {
    size: 27,
    weight: 800
  });
  const height = padding * 2 + titleHeight + 14 + bodyHeight;

  drawPanel(ctx, x, y, width, height, { fill, shadow: false, radius: 14, lineWidth: 4 });
  drawWrappedCanvasText(ctx, title, x + padding, y + padding, width - padding * 2, 34, {
    size: 25,
    weight: 1000
  });
  drawWrappedCanvasText(ctx, body, x + padding, y + padding + titleHeight + 14, width - padding * 2, 38, {
    size: 27,
    weight: 800,
    color: "#302b21"
  });

  return y + height;
}

function drawScreenshotSection(ctx, title, items, x, y, width) {
  drawWrappedCanvasText(ctx, title, x, y, width, 40, { size: 30, weight: 1000 });
  y += 54;

  items.forEach((item) => {
    ctx.fillStyle = "#171717";
    ctx.beginPath();
    ctx.arc(x + 10, y + 17, 5, 0, Math.PI * 2);
    ctx.fill();
    y = drawWrappedCanvasText(ctx, item, x + 28, y, width - 28, 36, {
      size: 26,
      weight: 800,
      color: "#302b21"
    });
    y += 12;
  });

  return y + 12;
}

function safeFilenamePart(text) {
  return text.replace(/[\\/:*?"<>|]/g, "").replace(/\s+/g, "-");
}

function canvasToPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("分享卡生成失败，请稍后再试。"));
        return;
      }
      resolve(blob);
    }, "image/png");
  });
}

function downloadObjectUrl(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
}

function revokeShareCardObjectUrl() {
  if (shareCardObjectUrl) {
    URL.revokeObjectURL(shareCardObjectUrl);
  }
  shareCardObjectUrl = null;
  shareCardFilename = "";
  sharePreviewImage.removeAttribute("src");
  shareDownloadButton.disabled = true;
}

function openShareCardPreview(blob, filename) {
  revokeShareCardObjectUrl();
  shareCardObjectUrl = URL.createObjectURL(blob);
  shareCardFilename = filename;
  sharePreviewImage.src = shareCardObjectUrl;
  shareDownloadButton.disabled = false;
  shareCardModal.hidden = false;
  document.body.classList.add("has-share-card-modal");
  shareDownloadButton.focus();
}

function closeShareCardPreview() {
  shareCardModal.hidden = true;
  document.body.classList.remove("has-share-card-modal");
  revokeShareCardObjectUrl();
}

async function createResultShareCardCanvas() {
  const { sides, code, profile, match } = getCurrentResultData();
  const shareCardImage = await loadImageAsset(personaImages[code] || personaImages.ISCR);

  const width = 1080;
  const margin = 56;
  const contentWidth = width - margin * 2;
  const draft = document.createElement("canvas");
  draft.width = width;
  draft.height = 9000;
  const ctx = draft.getContext("2d");
  let y = margin;

  drawWrappedCanvasText(ctx, "TEACHERTI 结果", margin, y, contentWidth, 34, {
    size: 26,
    weight: 1000
  });
  y += 46;
  drawWrappedCanvasText(ctx, code, margin, y, contentWidth, 78, {
    size: 72,
    weight: 1000
  });
  y += 82;
  drawWrappedCanvasText(ctx, profile.englishName, margin, y, contentWidth, 52, {
    size: 42,
    weight: 1000,
    maxLines: 2
  });
  y += 58;
  y = drawWrappedCanvasText(ctx, profile.name, margin, y, contentWidth, 50, {
    size: 40,
    weight: 1000,
    color: "#554b39"
  });
  y += 22;

  drawPanel(ctx, margin, y, 210, 64, { fill: "#7c5cff", radius: 999, lineWidth: 5 });
  drawWrappedCanvasText(ctx, `匹配度 ${match}%`, margin + 28, y + 16, 160, 34, {
    size: 28,
    weight: 1000,
    color: "#ffffff"
  });
  y += 98;

  drawPanel(ctx, margin, y, contentWidth, contentWidth, { fill: "#ffffff", radius: 16, lineWidth: 5 });
  ctx.save();
  drawRoundRect(ctx, margin, y, contentWidth, contentWidth, 16);
  ctx.clip();
  ctx.drawImage(shareCardImage, margin, y, contentWidth, contentWidth);
  ctx.restore();
  y += contentWidth + 42;

  const educatorPadding = 36;
  const educatorStoryHeight = measureWrappedCanvasText(ctx, profile.story, contentWidth - educatorPadding * 2, 44, {
    size: 30,
    weight: 850
  });
  const educatorHeight = educatorPadding * 2 + 32 + 74 + educatorStoryHeight + 24;
  drawPanel(ctx, margin, y, contentWidth, educatorHeight, { fill: "#2ed3a6", radius: 18, lineWidth: 5 });
  drawWrappedCanvasText(ctx, profile.kind, margin + educatorPadding, y + educatorPadding, contentWidth - educatorPadding * 2, 32, {
    size: 25,
    weight: 1000
  });
  drawWrappedCanvasText(ctx, profile.figure, margin + educatorPadding, y + educatorPadding + 42, contentWidth - educatorPadding * 2, 70, {
    size: 58,
    weight: 1000
  });
  drawWrappedCanvasText(ctx, profile.story, margin + educatorPadding, y + educatorPadding + 120, contentWidth - educatorPadding * 2, 44, {
    size: 30,
    weight: 850
  });
  y += educatorHeight + 34;

  const noteText = `${profile.summary}\n${profile.note}`;
  const noteHeight = measureWrappedCanvasText(ctx, noteText, contentWidth - 52, 42, {
    size: 29,
    weight: 1000
  });
  drawPanel(ctx, margin, y, contentWidth, noteHeight + 52, { fill: "#ffd84d", radius: 16, lineWidth: 5 });
  drawWrappedCanvasText(ctx, noteText, margin + 26, y + 26, contentWidth - 52, 42, {
    size: 29,
    weight: 1000
  });
  y += noteHeight + 86;

  drawWrappedCanvasText(ctx, "谁最吃你这套", margin, y, contentWidth, 42, {
    size: 34,
    weight: 1000
  });
  y += 58;
  const fitGap = 22;
  const fitWidth = (contentWidth - fitGap) / 2;
  const fitY = y;
  const studentBottom = drawScreenshotCard(
    ctx,
    "最适合你的学生",
    profile.fitStudent,
    margin,
    fitY,
    fitWidth,
    "#e6f6ff"
  );
  const parentBottom = drawScreenshotCard(
    ctx,
    "最喜欢你的家长",
    profile.fitParent,
    margin + fitWidth + fitGap,
    fitY,
    fitWidth,
    "#fff0b8"
  );
  y = Math.max(studentBottom, parentBottom) + 42;

  y = drawScreenshotSection(
    ctx,
    "人设高光",
    getAxisEntries().map(([key]) => sides[key].strength),
    margin,
    y,
    contentWidth
  );
  y = drawScreenshotSection(
    ctx,
    "翻车提醒",
    getAxisEntries().map(([key]) => sides[key].blind),
    margin,
    y,
    contentWidth
  );
  y = drawScreenshotSection(
    ctx,
    "日常建议",
    getAxisEntries().map(([key]) => sides[key].action),
    margin,
    y,
    contentWidth
  );
  y += 22;

  drawWrappedCanvasText(ctx, "MBTI先放一放，TeacherTI开始点名。", margin, y, contentWidth, 36, {
    size: 26,
    weight: 1000,
    color: "#554b39"
  });
  y += 64;

  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = width;
  finalCanvas.height = Math.ceil(y + margin);
  const finalCtx = finalCanvas.getContext("2d");
  finalCtx.fillStyle = "#fff7df";
  finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
  drawPanel(finalCtx, 24, 24, width - 48, finalCanvas.height - 48, {
    fill: "#fffdf3",
    shadow: false,
    radius: 18,
    lineWidth: 5
  });
  finalCtx.drawImage(draft, 0, 0);
  return { canvas: finalCanvas, code, profile };
}

async function generateResultShareCard() {
  const originalLabel = printButton.textContent;
  printButton.disabled = true;
  printButton.textContent = "生成中...";

  try {
    const { canvas, code, profile } = await createResultShareCardCanvas();
    const blob = await canvasToPngBlob(canvas);
    openShareCardPreview(blob, `TeacherTI-${code}-${safeFilenamePart(profile.name)}.png`);
  } catch (error) {
    window.alert(error.message || "分享卡生成失败，请稍后再试。");
  } finally {
    printButton.disabled = false;
    printButton.textContent = originalLabel;
  }
}

function renderResult() {
  state.showingResult = true;
  contentGrid.classList.add("is-result-mode");
  const scores = calculateScores();
  const sides = selectedSides(scores);
  const code = buildType(scores);
  const profile = typeProfiles[code] || typeProfiles.ISCR;
  const match = calculateMatch(scores);

  quizView.hidden = true;
  resultView.hidden = false;
  questionMeta.textContent = "教师人格已出炉";
  progressFill.style.width = "100%";
  typeCode.textContent = code;
  typeName.textContent = profile.englishName;
  typeCnName.textContent = profile.name;
  matchScore.textContent = `匹配度 ${match}%`;
  personaWarmToken += 1;
  const resultImageSrc = personaImages[code] || personaImages.ISCR;
  showResultPersonaImage(resultImageSrc, `${profile.name}角色设定图`);
  educatorKind.textContent = profile.kind;
  educatorName.textContent = profile.figure;
  educatorStory.textContent = profile.story;
  renderSystemNote(profile.summary, profile.note);
  fitStudent.textContent = profile.fitStudent;
  fitParent.textContent = profile.fitParent;

  renderList(
    strengthList,
    getAxisEntries().map(([key]) => sides[key].strength)
  );
  renderList(
    blindList,
    getAxisEntries().map(([key]) => sides[key].blind)
  );
  renderList(
    actionList,
    getAxisEntries().map(([key]) => sides[key].action)
  );
  renderScoreBars(scores);
  saveState();
}

function chooseAnswer(value) {
  const questionIndex = state.current;
  state.answers[state.current] = value;
  renderQuiz();

  if (advanceTimer) {
    window.clearTimeout(advanceTimer);
    advanceTimer = null;
  }
  advanceTimer = window.setTimeout(() => {
    advanceTimer = null;
    if (state.current !== questionIndex || state.answers[questionIndex] !== value) return;
    if (questionIndex === questions.length - 1) {
      renderResult();
      return;
    }

    state.current = questionIndex + 1;
    renderQuiz();
  }, 180);
}

function goPrev() {
  if (advanceTimer) {
    window.clearTimeout(advanceTimer);
    advanceTimer = null;
  }
  if (state.current === 0) return;
  state.current -= 1;
  renderQuiz();
}

function restart() {
  if (advanceTimer) {
    window.clearTimeout(advanceTimer);
    advanceTimer = null;
  }
  state.current = 0;
  state.answers = Array(questions.length).fill(null);
  state.showingResult = false;
  renderQuiz();
}

optionGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-value]");
  if (!button) return;
  chooseAnswer(Number(button.dataset.value));
});

prevButton.addEventListener("click", goPrev);
restartButton.addEventListener("click", restart);
printButton.addEventListener("click", generateResultShareCard);
shareDownloadButton.addEventListener("click", () => {
  if (!shareCardObjectUrl) return;
  downloadObjectUrl(shareCardObjectUrl, shareCardFilename || "TeacherTI-share-card.png");
});
shareCloseButton.addEventListener("click", closeShareCardPreview);
shareCardModal.addEventListener("click", (event) => {
  if (event.target === shareCardModal) closeShareCardPreview();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !shareCardModal.hidden) {
    closeShareCardPreview();
  }
});

if (state.showingResult && state.answers.every((answer) => answer !== null)) {
  renderResult();
} else {
  renderQuiz();
}
