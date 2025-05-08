function init() {
    var environment = karate.properties['environment'];
    var headless = karate.properties['headless'];
    var remoteWebdriver = karate.properties['webdriverServer'];
    var browser = karate.properties['browser'];
    var packageName = karate.properties['package_name'];
    var webDriverSession;

    //Default Environment
    if (!environment){
        environment = 'qa';
    }

    //Default Remote Webdriver
    if (!remoteWebdriver) {
        remoteWebdriver = 'local';
    }

    //Default Package
    if (!packageName){
        packageName = 'TestData'
    }

    //Default Browser
    if (!browser) {
        browser = 'chrome';
    } else if (browser == 'firefox') {
        browser = 'geckodriver';
    }
    
    if(remoteWebdriver == 'local') {
        browser = 'chromedriver';
    }

    //Werdriver Session Settings for Chrome and Firefox
    if (browser == "chromedriver") {
        webDriverSession = {
            capabilities: {
                alwaysMatch: {
                    browserName: 'chrome',
                    'goog:chromeOptions':{
                        args: [
                            '--windows-size=1920,1080',
                            '--disable-popup-blocking',
                            '--disable-notifications',
                            '--remote-allow-origins=*'
                        ]
                    },
                    'selenoid:options': {
                        name: 'PC',
                        enableVNC: true,
                        enableVideo: true
                    }
                }
            }
        };
    } else {
        webDriverSession = {
            capabilities: {
                alwaysMatch: {
                    browserName: 'firefox',
                    'moz:firefoxOptions': {
                        args: ['--windows-size=1920,1080']
                    },
                    'selenoid:options':{
                        name: 'PC',
                        enableVNC: true,
                        enableVideo: true
                    }
                }
            }
        };
    }
    //Configurations for Webdriver Local
    if (headless === "true") {
        karate.confugure('driverTarget', {
            docker: 'justinribeiro/chrome-headless',
            showDriverLog: false
        });
        karate.configure('driver',{
            type: 'chrome',
            addOptions: [
                '--disable-gpu',
                '--headless=new',
                '--window-size=1920,1080',
                '--disable-popup-blocking',
                '--disable-notifications',
                '--remote-allow-origins=*'
            ],
            headless: true
        });
    } else {
        //Local Webdriver with HeadLess Off
        karate.configure('driver', {
            type: browser,
            addOptions: [
                '--disable-popup-blocking',
                '--disable-notifications',
                '--remote-allow-origins=*'
            ],
            httpConfig: { readTimeout: 220000 }
        });
        karate.configure('connectTimeout', 60000);
        karate.configure('readTimeout', 80000);
    }
    var config =  karate.read('classpath:' + environment + '_' + packageName + '_properties.json');
    return config;
}
