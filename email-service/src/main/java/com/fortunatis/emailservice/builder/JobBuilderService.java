package com.fortunatis.emailservice.builder;

import org.quartz.JobDataMap;
import org.springframework.scheduling.quartz.QuartzJobBean;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface JobBuilderService {
    boolean scheduleOneTimeJob(String group, Class<? extends QuartzJobBean> jobClass, Date date, JobDataMap jobDataMap);

    boolean scheduleCronJob(String jobName, String group, Class<? extends QuartzJobBean> jobClass, Date date, String cronExpression, JobDataMap jobDataMap);

    boolean updateOneTimeJob(String jobName, Date date);

    boolean updateCronJob(String jobName, Date date, String cronExpression);

    boolean unScheduleJob(String jobName);

    boolean deleteJob(String jobName, String group);

    boolean pauseJob(String jobName);

    boolean resumeJob(String jobName);

    boolean startJobNow(String jobName);

    boolean isJobRunning(String jobName);

    List<Map<String, Object>> getAllJobs();

    boolean isJobWithNamePresent(String jobName);

    String getJobState(String jobName);

    boolean stopJob(String jobName, String group);
}
