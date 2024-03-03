package com.sky.aspect;

import com.sky.annotation.AutoFill;
import com.sky.constant.AutoFillConstant;
import com.sky.context.BaseContext;
import com.sky.enumeration.OperationType;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.time.LocalDateTime;

@Aspect
@Component
@Slf4j
public class AutoFillAspect {
    @Pointcut("execution(* com.sky.mapper.*.*(..)) && @annotation(com.sky.annotation.AutoFill)")
    public void autoFillPointcut() {
    }

    @Before("autoFillPointcut()")
    public void autoFill(JoinPoint joinPoint) {
        log.info("公共字段填充...");
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        AutoFill autoFill = signature.getMethod().getAnnotation(AutoFill.class);
        OperationType operationType = autoFill.value();

        Object entity = joinPoint.getArgs()[0];

        LocalDateTime time = LocalDateTime.now();
        Long empId = BaseContext.getCurrentId();

        Method setCreateTime, setUpdateTime, setCreateUser, setUpdateUser;
        try {
            setCreateTime = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_CREATE_TIME, LocalDateTime.class);
            setUpdateTime = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_TIME, LocalDateTime.class);
            setCreateUser = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_CREATE_USER, Long.class);
            setUpdateUser = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_USER, Long.class);
        } catch (Exception ex) {
            log.error("公共字段自动填充失败：{}", ex.getMessage());
            return;
        }

        try {
            if (operationType == OperationType.INSERT) {
                setCreateTime.invoke(entity, time);
                setUpdateTime.invoke(entity, time);
                setCreateUser.invoke(entity, empId);
                setUpdateUser.invoke(entity, empId);
            } else if (operationType == OperationType.UPDATE) {
                setUpdateTime.invoke(entity, time);
                setUpdateUser.invoke(entity, empId);
            }
        } catch (Exception ex) {
            log.error("公共字段自动填充失败：{}", ex.getMessage());
        }
    }
}
