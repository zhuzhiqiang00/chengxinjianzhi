package cxjz.controller;

import com.soh.frame.model.Result;
import cxjz.service.intf.UserServiceIntf;
import org.junit.*;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

/**
 * Created by Administrator on 2018/11/19 0019.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml","classpath:spring-mvc.xml"})
public class LoginControllerTest  {
    protected Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private UserServiceIntf userServiceIntf;

    @BeforeClass//@BeforeClass所修饰的方法在所有方法加载前执行，而且他是静态的在类加载后就会执行该方法，在内存中只有一份实例，适合用来加载配置文件
    public static void setUpBeforeClass() throws Exception {

    }
    @AfterClass//@AfterClass所修饰的方法在所有方法执行完毕之后执行，通常用来进行资源清理，例如关闭数据库连接。
    public static void setUpAfterClass() throws Exception {

    }

    @Before
    public void before() throws Exception {
//        ApplicationContext context =
//                new ClassPathXmlApplicationContext(
//                        "spring-mvc.xml");
//        userServiceIntf = context.getBean(
//                "userServiceImple",UserServiceIntf.class);
    }

    @After
    public void after() throws Exception {

    }

    @Test
    public void isRegisted() throws Exception {

        String studNo = "1331307140";
        Result<Integer> result =  userServiceIntf.isRegisted(studNo);
        System.out.println("结果:"+result.toString());
    }

}