const testData: {
  foundTokens: string[];
  similarTokens: { count: number; similarity: number; token: string }[];
} = {
  foundTokens: ['trump'],
  similarTokens: [
    {
      count: 5099,
      similarity: 0.5025271773338318,
      token: 'donald'
    },
    {
      count: 3304,
      similarity: 0.4963964819908142,
      token: 'undermine'
    },
    {
      count: 4943,
      similarity: 0.4953611493110657,
      token: "trump's"
    },
    {
      count: 78,
      similarity: 0.49039241671562195,
      token: 'fairness'
    },
    {
      count: 3338,
      similarity: 0.48234325647354126,
      token: 'legitimacy'
    },
    {
      count: 4837,
      similarity: 0.47865718603134155,
      token: 'd.d.c'
    },
    {
      count: 5206,
      similarity: 0.4714294672012329,
      token: 'clinton'
    },
    {
      count: 2510,
      similarity: 0.47056901454925537,
      token: 'tillerson'
    },
    {
      count: 1800,
      similarity: 0.47033756971359253,
      token: 'rosenstein'
    },
    {
      count: 4163,
      similarity: 0.47031575441360474,
      token: "fbi's"
    },
    {
      count: 4505,
      similarity: 0.4698846936225891,
      token: "flynn's"
    },
    {
      count: 4669,
      similarity: 0.46913957595825195,
      token: 'obama'
    },
    {
      count: 3610,
      similarity: 0.4678315818309784,
      token: 'credibility'
    },
    {
      count: 5093,
      similarity: 0.4664764702320099,
      token: 'mifsud'
    },
    {
      count: 1677,
      similarity: 0.4613981246948242,
      token: 'beingpatriotic'
    },
    {
      count: 1526,
      similarity: 0.4610446095466614,
      token: 'belief'
    },
    {
      count: 4875,
      similarity: 0.46010497212409973,
      token: "russia's"
    },
    {
      count: 3458,
      similarity: 0.4564801752567291,
      token: 'prod1'
    },
    {
      count: 5189,
      similarity: 0.4558764398097992,
      token: 'kislyak'
    },
    {
      count: 2453,
      similarity: 0.4537002146244049,
      token: 'offacebook'
    },
    {
      count: 5205,
      similarity: 0.45369553565979004,
      token: 'matter'
    },
    {
      count: 3840,
      similarity: 0.4518886208534241,
      token: 'nerk'
    },
    {
      count: 3211,
      similarity: 0.45186933875083923,
      token: 'truth'
    },
    {
      count: 1541,
      similarity: 0.4475230276584625,
      token: 'compromise'
    },
    {
      count: 1702,
      similarity: 0.44693389534950256,
      token: '1601685693432389'
    },
    {
      count: 2177,
      similarity: 0.44684115052223206,
      token: 'contrary'
    },
    {
      count: 3666,
      similarity: 0.44678613543510437,
      token: '100009922908461'
    },
    {
      count: 4166,
      similarity: 0.44669124484062195,
      token: 'atterttey'
    },
    {
      count: 4588,
      similarity: 0.44548922777175903,
      token: "government's"
    },
    {
      count: 3922,
      similarity: 0.4449893832206726,
      token: 'politics'
    },
    {
      count: 3285,
      similarity: 0.4434627592563629,
      token: 'hpsci'
    },
    {
      count: 4918,
      similarity: 0.44248896837234497,
      token: "counsel's"
    },
    {
      count: 1646,
      similarity: 0.44165635108947754,
      token: 'm1ty'
    },
    {
      count: 4881,
      similarity: 0.4414498805999756,
      token: 'matters'
    },
    {
      count: 1079,
      similarity: 0.44127994775772095,
      token: 'certainty'
    },
    {
      count: 1714,
      similarity: 0.44108647108078003,
      token: 'donaldtrump'
    },
    {
      count: 4767,
      similarity: 0.438719242811203,
      token: "manafort's"
    },
    {
      count: 5246,
      similarity: 0.4385908246040344,
      token: 'justice'
    },
    {
      count: 3811,
      similarity: 0.4381551444530487,
      token: 'skiber'
    },
    {
      count: 4954,
      similarity: 0.4376668632030487,
      token: 'hillary'
    },
    {
      count: 4313,
      similarity: 0.43742892146110535,
      token: 'c.f.r'
    },
    {
      count: 1671,
      similarity: 0.4337373375892639,
      token: '100011698576461'
    },
    {
      count: 4059,
      similarity: 0.4335483908653259,
      token: '2230634'
    },
    {
      count: 2326,
      similarity: 0.4330551326274872,
      token: 'necessarily'
    },
    {
      count: 1687,
      similarity: 0.43231484293937683,
      token: 'rogerjstonejr'
    },
    {
      count: 4693,
      similarity: 0.43197211623191833,
      token: 'facts'
    },
    {
      count: 4518,
      similarity: 0.43192240595817566,
      token: "wikileaks's"
    },
    {
      count: 3672,
      similarity: 0.43082553148269653,
      token: 'aharm'
    },
    {
      count: 2402,
      similarity: 0.43067455291748047,
      token: 'aside'
    },
    {
      count: 2570,
      similarity: 0.43049097061157227,
      token: 'persuasion'
    },
    {
      count: 3237,
      similarity: 0.43030762672424316,
      token: 'ten_'
    },
    {
      count: 4093,
      similarity: 0.4290149509906769,
      token: 'pred1'
    },
    {
      count: 4361,
      similarity: 0.42799073457717896,
      token: 'decisions'
    },
    {
      count: 3485,
      similarity: 0.4278973937034607,
      token: 'atterney'
    },
    {
      count: 4073,
      similarity: 0.4277474284172058,
      token: "kushner's"
    },
    {
      count: 3675,
      similarity: 0.42757850885391235,
      token: "ira's"
    },
    {
      count: 3652,
      similarity: 0.42734646797180176,
      token: 'realdonaldtrump'
    },
    {
      count: 1510,
      similarity: 0.4266735911369324,
      token: 'barack'
    },
    {
      count: 4556,
      similarity: 0.42604517936706543,
      token: 'democratic'
    },
    {
      count: 3523,
      similarity: 0.4256909489631653,
      token: 'prndttet'
    },
    {
      count: 5238,
      similarity: 0.4254526197910309,
      token: 'manafort'
    },
    {
      count: 3182,
      similarity: 0.42237749695777893,
      token: 'reason'
    },
    {
      count: 1733,
      similarity: 0.4223622679710388,
      token: '11harm'
    },
    {
      count: 5195,
      similarity: 0.42096003890037537,
      token: 'dmitriev'
    },
    {
      count: 3131,
      similarity: 0.4206600785255432,
      token: 'lack'
    },
    {
      count: 68,
      similarity: 0.4195941686630249,
      token: 'notwithstanding'
    },
    {
      count: 1724,
      similarity: 0.41930264234542847,
      token: '1479936895656747'
    },
    {
      count: 3138,
      similarity: 0.4192308783531189,
      token: 'whatever'
    },
    {
      count: 3774,
      similarity: 0.4180287718772888,
      token: 'ivanka'
    },
    {
      count: 3135,
      similarity: 0.41778284311294556,
      token: 'willingness'
    },
    {
      count: 262,
      similarity: 0.4176071882247925,
      token: 'ought'
    },
    {
      count: 1690,
      similarity: 0.4174747169017792,
      token: 'mcfaul'
    },
    {
      count: 3813,
      similarity: 0.4167983829975128,
      token: 'ten_gop'
    },
    {
      count: 2600,
      similarity: 0.4164450466632843,
      token: 'supreme'
    },
    {
      count: 2885,
      similarity: 0.41544604301452637,
      token: 'kellyanne'
    },
    {
      count: 4645,
      similarity: 0.41488879919052124,
      token: 'constitutional'
    },
    {
      count: 4265,
      similarity: 0.41484153270721436,
      token: 'doubt'
    },
    {
      count: 5186,
      similarity: 0.4141080379486084,
      token: 'kilimnik'
    },
    {
      count: 4884,
      similarity: 0.4141075015068054,
      token: 'paul'
    },
    {
      count: 1880,
      similarity: 0.413476824760437,
      token: 'loyalty'
    },
    {
      count: 4752,
      similarity: 0.41302594542503357,
      token: 'george'
    },
    {
      count: 4925,
      similarity: 0.4128108024597168,
      token: 'mttterittl'
    },
    {
      count: 2525,
      similarity: 0.41253137588500977,
      token: 'cotttttitt'
    },
    {
      count: 2843,
      similarity: 0.41180071234703064,
      token: 'promise'
    },
    {
      count: 3991,
      similarity: 0.4114452600479126,
      token: 'steve'
    },
    {
      count: 1883,
      similarity: 0.41130149364471436,
      token: 'govern'
    },
    {
      count: 389,
      similarity: 0.4108904004096985,
      token: 'trust'
    },
    {
      count: 5071,
      similarity: 0.41007792949676514,
      token: 'political'
    },
    {
      count: 4026,
      similarity: 0.4099959135055542,
      token: 'nothing'
    },
    {
      count: 2423,
      similarity: 0.4099174439907074,
      token: 'freedom'
    },
    {
      count: 2398,
      similarity: 0.40968918800354004,
      token: "crifl'i"
    },
    {
      count: 4233,
      similarity: 0.4096321165561676,
      token: 'laws'
    },
    {
      count: 1941,
      similarity: 0.4089704751968384,
      token: 'regardless'
    },
    {
      count: 4253,
      similarity: 0.40855151414871216,
      token: 'cehtttih'
    },
    {
      count: 1825,
      similarity: 0.4081852436065674,
      token: 'ozhin'
    },
    {
      count: 5221,
      similarity: 0.40750131011009216,
      token: 'united'
    },
    {
      count: 5045,
      similarity: 0.40725621581077576,
      token: 'u.s.c'
    },
    {
      count: 771,
      similarity: 0.4072004556655884,
      token: 'favor'
    },
    {
      count: 4192,
      similarity: 0.40679872035980225,
      token: 'prove'
    },
    {
      count: 4143,
      similarity: 0.4067833125591278,
      token: "putin's"
    }
  ]
};

export default testData;
