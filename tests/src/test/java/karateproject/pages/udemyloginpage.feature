Feature: Common Page Items and Locators for Udemy Screen

Background: Setup Locators
* call read 'classpath:/karateproject/pages/udemyloginpage.json'
* def refreshBrowser =
    """
      function(xpath) {
      for(var i=0; i<6; i++)
      {
      if(!(exists(xpath)))
      {
        driver.refresh()
        delay(4000)
        karate.log('executed')
      }  
      
    }
    karate.log('Email Field is not available')
    }
    """

@callFunctionForLoginVerification
Scenario: Verify Udemy Login Screen Item.
    * def loginButton = udemyLoginPage.loginButton
    * karate.log(loginButton)
    * if(!(exists(loginButton))) karate.fail('Unable to find Login Button')
    * delay(3000)
    
@clickLogintoUdemy
Scenario: Click on Login Button
    * retry(10,2000).click(loginButton)
    * def status = refreshBrowser(udemyLoginPage.emailfield)
    * input(udemyLoginPage.emailfield, 'text')
    * delay(4000)

