Feature: Login to Udemy and Verify User Able to verify Functionality

  Background: Setup
    * configure driver = { type: 'chrome' }
    * def udemyLoginVerification = read('classpath:/karateproject/pages/udemyloginpage.feature@callFunctionForLoginVerification')
    * def udemyLoginClick = read('classpath:/karateproject/pages/udemyloginpage.feature@clickLogintoUdemy')
    # * configure driverTarget = { docker: 'ptrthomas/karate-chrome', showDriverLog: true }

  @test12
  Scenario: Navigate to Udemy and Verify Login

    # Instasiate Driver and Lunch URL
    * def udemyURL = udemy_EndPoint
    * karate.log(udemyURL)
    Given driver udemyURL
    And driver.maximize()
    Then retry(10,5000).waitUntil("document.readyState == 'complete'")
  
    #Verify Login Button is Present and Clicable Or Not.
    And call udemyLoginVerification
    Then call udemyLoginClick