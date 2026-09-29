package com.sisait.webapp.controller;

import com.sisait.webapp.dto.TestDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HomeCotroller {

    @RequestMapping(value = "", method = RequestMethod.GET)
//    @RequestMapping("/"); // get방식접속
//    @RequestMapping(value = "/", method = RequestMethod.POST)
    public String home(){
        System.out.println("home 컨트롤러 실행됨");
        return "index"; //index.html <<
    }
    @GetMapping("/list")
    public String test(int page){
        System.out.println("페이지" + page);
        return "board";
    }

    @RequestMapping(value = "/my/infor", method = RequestMethod.POST)
//    @PostMapping("/my/infor")
    public ModelAndView information(String username, int age){
        System.out.println("이름" + username);
        System.out.println("나이" + age);

        ModelAndView mav = new ModelAndView();

        //뒤페이지 설정
        mav.setViewName("board");
        return mav;
    }
    @PostMapping("/my/infor2")
    public ModelAndView information2(TestDTO dto){
        System.out.println("이름 : " + dto.getUsername());
        System.out.println("아이디 : " + dto.getUserid());
        System.out.println("나이 : " + dto.getAge());

        ModelAndView mav = new ModelAndView();
        mav.setViewName("board"); // "index" 대신 "board"로 변경해 보세요!
        return mav;
    }

    @GetMapping("/test/{won}/{product}")
    public String test2(@PathVariable int won, @PathVariable String product){
        System.out.println("won -> " + (won+10000) + "원");
        System.out.println("product => " + product);

        return "index";
    }
}
