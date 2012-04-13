var clover = new Object();

// JSON: {classes : [{name, id, sl, el,  methods : [{sl, el}, ...]}, ...]}
clover.pageData = {"classes":[{"el":272,"id":3993,"methods":[{"el":45,"sc":5,"sl":41},{"el":75,"sc":5,"sl":47},{"el":80,"sc":5,"sl":77},{"el":85,"sc":5,"sl":82},{"el":95,"sc":5,"sl":87},{"el":100,"sc":5,"sl":97},{"el":110,"sc":5,"sl":102},{"el":119,"sc":5,"sl":112},{"el":129,"sc":5,"sl":121},{"el":134,"sc":5,"sl":131},{"el":146,"sc":5,"sl":136},{"el":156,"sc":5,"sl":148},{"el":161,"sc":5,"sl":158},{"el":171,"sc":5,"sl":163},{"el":182,"sc":5,"sl":173},{"el":189,"sc":5,"sl":184},{"el":200,"sc":5,"sl":191},{"el":208,"sc":5,"sl":202},{"el":222,"sc":5,"sl":210},{"el":230,"sc":5,"sl":224},{"el":242,"sc":5,"sl":232},{"el":251,"sc":5,"sl":244},{"el":266,"sc":5,"sl":253},{"el":271,"sc":5,"sl":268}],"name":"MockBuilderTest","sl":35}]}

// JSON: {test_ID : {"methods": [ID1, ID2, ID3...], "name" : "testXXX() void"}, ...};
clover.testTargets = {"test_1002":{"methods":[{"sl":184}],"name":"testCreateMockIMocksControl","pass":true,"statements":[{"sl":186},{"sl":187},{"sl":188}]},"test_1012":{"methods":[{"sl":148}],"name":"testWithConstructorWithArgs","pass":true,"statements":[{"sl":150},{"sl":151},{"sl":152}]},"test_1013":{"methods":[{"sl":77}],"name":"testAddMethod_NotExisting","pass":true,"statements":[{"sl":79}]},"test_1065":{"methods":[{"sl":253}],"name":"testCreateStrictMockString","pass":true,"statements":[{"sl":255},{"sl":257},{"sl":258},{"sl":259},{"sl":260},{"sl":261},{"sl":264}]},"test_109":{"methods":[{"sl":202}],"name":"testCreateNiceMock","pass":true,"statements":[{"sl":204},{"sl":205},{"sl":206},{"sl":207}]},"test_137":{"methods":[{"sl":191}],"name":"testCreateMock","pass":true,"statements":[{"sl":193},{"sl":194},{"sl":195},{"sl":196}]},"test_142":{"methods":[{"sl":77}],"name":"testAddMethod_NotExisting","pass":true,"statements":[{"sl":79}]},"test_143":{"methods":[{"sl":87}],"name":"testWithConstructorParams","pass":true,"statements":[{"sl":89},{"sl":90},{"sl":91}]},"test_16":{"methods":[{"sl":253}],"name":"testCreateStrictMockString","pass":true,"statements":[{"sl":255},{"sl":257},{"sl":258},{"sl":259},{"sl":260},{"sl":261},{"sl":264}]},"test_171":{"methods":[{"sl":136}],"name":"testWithConstructorConstructorArgs","pass":true,"statements":[{"sl":138},{"sl":140},{"sl":141},{"sl":142}]},"test_178":{"methods":[{"sl":97}],"name":"testWithConstructor_WrongClass","pass":true,"statements":[{"sl":99}]},"test_199":{"methods":[{"sl":163}],"name":"testWithArgsTwice","pass":true,"statements":[{"sl":165},{"sl":166},{"sl":169}]},"test_212":{"methods":[{"sl":121}],"name":"testWithConstructor","pass":true,"statements":[{"sl":123},{"sl":124},{"sl":125}]},"test_213":{"methods":[{"sl":244}],"name":"testCreateNiceMockString","pass":true,"statements":[{"sl":246},{"sl":247},{"sl":248},{"sl":249},{"sl":250}]},"test_235":{"methods":[{"sl":87}],"name":"testWithConstructorParams","pass":true,"statements":[{"sl":89},{"sl":90},{"sl":91}]},"test_28":{"methods":[{"sl":268}],"name":"testCreateMock_ConstructorWithoutArgs","pass":true,"statements":[{"sl":270}]},"test_290":{"methods":[{"sl":268}],"name":"testCreateMock_ConstructorWithoutArgs","pass":true,"statements":[{"sl":270}]},"test_4":{"methods":[{"sl":224}],"name":"testCreateMockStringIMocksControl","pass":true,"statements":[{"sl":226},{"sl":227},{"sl":228},{"sl":229}]},"test_400":{"methods":[{"sl":121}],"name":"testWithConstructor","pass":true,"statements":[{"sl":123},{"sl":124},{"sl":125}]},"test_436":{"methods":[{"sl":47}],"name":"testAddMockedMethod","pass":true,"statements":[{"sl":49},{"sl":54},{"sl":56},{"sl":57},{"sl":58},{"sl":59},{"sl":60},{"sl":61},{"sl":62},{"sl":64},{"sl":66},{"sl":67},{"sl":68},{"sl":69},{"sl":70},{"sl":71},{"sl":72},{"sl":74}]},"test_491":{"methods":[{"sl":131}],"name":"testWithConstructor_Twice","pass":true,"statements":[{"sl":133}]},"test_495":{"methods":[{"sl":173}],"name":"testWithArgs_WithoutConstructor","pass":true,"statements":[{"sl":175},{"sl":176},{"sl":179}]},"test_512":{"methods":[{"sl":158}],"name":"testWithConstructorWithArgs_NotExisting","pass":true,"statements":[{"sl":160}]},"test_517":{"methods":[{"sl":173}],"name":"testWithArgs_WithoutConstructor","pass":true,"statements":[{"sl":175},{"sl":176},{"sl":179}]},"test_578":{"methods":[{"sl":224}],"name":"testCreateMockStringIMocksControl","pass":true,"statements":[{"sl":226},{"sl":227},{"sl":228},{"sl":229}]},"test_581":{"methods":[{"sl":244}],"name":"testCreateNiceMockString","pass":true,"statements":[{"sl":246},{"sl":247},{"sl":248},{"sl":249},{"sl":250}]},"test_627":{"methods":[{"sl":97}],"name":"testWithConstructor_WrongClass","pass":true,"statements":[{"sl":99}]},"test_631":{"methods":[{"sl":112}],"name":"testWithEmptyConstructor_NoEmptyConstructor","pass":true,"statements":[{"sl":114},{"sl":115}]},"test_642":{"methods":[{"sl":202}],"name":"testCreateNiceMock","pass":true,"statements":[{"sl":204},{"sl":205},{"sl":206},{"sl":207}]},"test_660":{"methods":[{"sl":210}],"name":"testCreateStrictMock","pass":true,"statements":[{"sl":212},{"sl":214},{"sl":215},{"sl":216},{"sl":217},{"sl":218}]},"test_661":{"methods":[{"sl":112}],"name":"testWithEmptyConstructor_NoEmptyConstructor","pass":true,"statements":[{"sl":114},{"sl":115}]},"test_665":{"methods":[{"sl":82}],"name":"testAddMethodWithParams_NotExisting","pass":true,"statements":[{"sl":84}]},"test_693":{"methods":[{"sl":163}],"name":"testWithArgsTwice","pass":true,"statements":[{"sl":165},{"sl":166},{"sl":169}]},"test_7":{"methods":[{"sl":148}],"name":"testWithConstructorWithArgs","pass":true,"statements":[{"sl":150},{"sl":151},{"sl":152}]},"test_759":{"methods":[{"sl":136}],"name":"testWithConstructorConstructorArgs","pass":true,"statements":[{"sl":138},{"sl":140},{"sl":141},{"sl":142}]},"test_764":{"methods":[{"sl":232}],"name":"testCreateMockString","pass":true,"statements":[{"sl":234},{"sl":235},{"sl":236},{"sl":237},{"sl":240}]},"test_80":{"methods":[{"sl":210}],"name":"testCreateStrictMock","pass":true,"statements":[{"sl":212},{"sl":214},{"sl":215},{"sl":216},{"sl":217},{"sl":218}]},"test_809":{"methods":[{"sl":102}],"name":"testWithEmptyConstructor","pass":true,"statements":[{"sl":104},{"sl":105},{"sl":106},{"sl":107},{"sl":108},{"sl":109}]},"test_819":{"methods":[{"sl":232}],"name":"testCreateMockString","pass":true,"statements":[{"sl":234},{"sl":235},{"sl":236},{"sl":237},{"sl":240}]},"test_855":{"methods":[{"sl":47}],"name":"testAddMockedMethod","pass":true,"statements":[{"sl":49},{"sl":54},{"sl":56},{"sl":57},{"sl":58},{"sl":59},{"sl":60},{"sl":61},{"sl":62},{"sl":64},{"sl":66},{"sl":67},{"sl":68},{"sl":69},{"sl":70},{"sl":71},{"sl":72},{"sl":74}]},"test_899":{"methods":[{"sl":158}],"name":"testWithConstructorWithArgs_NotExisting","pass":true,"statements":[{"sl":160}]},"test_942":{"methods":[{"sl":102}],"name":"testWithEmptyConstructor","pass":true,"statements":[{"sl":104},{"sl":105},{"sl":106},{"sl":107},{"sl":108},{"sl":109}]},"test_95":{"methods":[{"sl":82}],"name":"testAddMethodWithParams_NotExisting","pass":true,"statements":[{"sl":84}]},"test_954":{"methods":[{"sl":191}],"name":"testCreateMock","pass":true,"statements":[{"sl":193},{"sl":194},{"sl":195},{"sl":196}]},"test_979":{"methods":[{"sl":131}],"name":"testWithConstructor_Twice","pass":true,"statements":[{"sl":133}]},"test_999":{"methods":[{"sl":184}],"name":"testCreateMockIMocksControl","pass":true,"statements":[{"sl":186},{"sl":187},{"sl":188}]}}

// JSON: { lines : [{tests : [testid1, testid2, testid3, ...]}, ...]};
clover.srcFileLines = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [436, 855], [], [436, 855], [], [], [], [], [436, 855], [], [436, 855], [436, 855], [436, 855], [436, 855], [436, 855], [436, 855], [436, 855], [], [436, 855], [], [436, 855], [436, 855], [436, 855], [436, 855], [436, 855], [436, 855], [436, 855], [], [436, 855], [], [], [1013, 142], [], [1013, 142], [], [], [95, 665], [], [95, 665], [], [], [143, 235], [], [143, 235], [143, 235], [143, 235], [], [], [], [], [], [627, 178], [], [627, 178], [], [], [809, 942], [], [809, 942], [809, 942], [809, 942], [809, 942], [809, 942], [809, 942], [], [], [661, 631], [], [661, 631], [661, 631], [], [], [], [], [], [400, 212], [], [400, 212], [400, 212], [400, 212], [], [], [], [], [], [491, 979], [], [491, 979], [], [], [759, 171], [], [759, 171], [], [759, 171], [759, 171], [759, 171], [], [], [], [], [], [1012, 7], [], [1012, 7], [1012, 7], [1012, 7], [], [], [], [], [], [899, 512], [], [899, 512], [], [], [693, 199], [], [693, 199], [693, 199], [], [], [693, 199], [], [], [], [495, 517], [], [495, 517], [495, 517], [], [], [495, 517], [], [], [], [], [1002, 999], [], [1002, 999], [1002, 999], [1002, 999], [], [], [137, 954], [], [137, 954], [137, 954], [137, 954], [137, 954], [], [], [], [], [], [109, 642], [], [109, 642], [109, 642], [109, 642], [109, 642], [], [], [660, 80], [], [660, 80], [], [660, 80], [660, 80], [660, 80], [660, 80], [660, 80], [], [], [], [], [], [578, 4], [], [578, 4], [578, 4], [578, 4], [578, 4], [], [], [764, 819], [], [764, 819], [764, 819], [764, 819], [764, 819], [], [], [764, 819], [], [], [], [581, 213], [], [581, 213], [581, 213], [581, 213], [581, 213], [581, 213], [], [], [16, 1065], [], [16, 1065], [], [16, 1065], [16, 1065], [16, 1065], [16, 1065], [16, 1065], [], [], [16, 1065], [], [], [], [290, 28], [], [290, 28], [], []]
