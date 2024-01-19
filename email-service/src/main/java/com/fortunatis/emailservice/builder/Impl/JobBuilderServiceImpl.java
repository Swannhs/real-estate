package com.fortunatis.emailservice.builder.Impl;

import com.fortunatis.emailservice.builder.JobBuilderService;
import com.fortunatis.emailservice.util.JobUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.quartz.impl.matchers.GroupMatcher;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobBuilderServiceImpl implements JobBuilderService {
    @Lazy
    private final SchedulerFactoryBean schedulerFactoryBean;
    private final ApplicationContext context;

    /**
     * Schedule a job by jobName at given date.
     */
    public Boolean scheduleJob(String group, JobDetail jobDetail, Trigger cronTriggerBean, JobKey jobKey) {
        try {
            Scheduler scheduler = schedulerFactoryBean.getScheduler();
            Date scheduleDate = scheduler.scheduleJob(jobDetail, cronTriggerBean);
            log.info("Job with key jobKey :" + jobKey + " and group :" + group + " scheduled successfully for date :" + scheduleDate);
            return true;
        } catch (SchedulerException e) {
            log.info("SchedulerException while scheduling job with key :" + jobKey + " message :" + e.getMessage());

            return false;
        }
    }

    @Override
    public boolean scheduleOneTimeJob(String group, Class<? extends QuartzJobBean> jobClass, Date date, JobDataMap jobDataMap) {
        String jobName = JobUtil.generateUniqueJobName();

        return scheduleJob(group, JobUtil.createJob(jobClass, false, context, jobName, group, jobDataMap), JobUtil.createSingleTrigger(JobUtil.createTriggerKey(jobName, group), date, SimpleTrigger.MISFIRE_INSTRUCTION_FIRE_NOW), JobUtil.createJobKey(jobName, group));
    }

    /**
     * Schedule a job by jobName at given date.
     */
    @Override
    public boolean scheduleCronJob(String jobName, String group, Class<? extends QuartzJobBean> jobClass, Date date, String cronExpression, JobDataMap jobDataMap) {
        return scheduleJob(group, JobUtil.createJob(jobClass, false, context, jobName, group, jobDataMap), JobUtil.createCronTrigger(JobUtil.createTriggerKey(jobName, group), date, cronExpression, SimpleTrigger.MISFIRE_INSTRUCTION_FIRE_NOW), JobUtil.createJobKey(jobName, group));
    }

    /**
     * Update one time scheduled job.
     */
    @Override
    public boolean updateOneTimeJob(String jobKey, Date date) {
        try {
            //Trigger newTrigger = JobUtil.createSingleTrigger(jobKey, date, SimpleTrigger.MISFIRE_INSTRUCTION_RESCHEDULE_NEXT_WITH_REMAINING_COUNT);
            Trigger newTrigger = JobUtil.createSingleTrigger(jobKey, date, SimpleTrigger.MISFIRE_INSTRUCTION_FIRE_NOW);

            Date dt = schedulerFactoryBean.getScheduler().rescheduleJob(TriggerKey.triggerKey(jobKey), newTrigger);
            log.info("Trigger associated with jobKey :" + jobKey + " rescheduled successfully for date :" + dt);
            return true;
        } catch (Exception e) {
            log.info("SchedulerException while updating one time job with key :" + jobKey + " message :" + e.getMessage());

            return false;
        }
    }

    /**
     * Update scheduled cron job.
     */
    @Override
    public boolean updateCronJob(String jobKey, Date date, String cronExpression) {
        log.info("Parameters received for updating cron job : jobKey :" + jobKey + ", date: " + date);
        try {
            //Trigger newTrigger = JobUtil.createSingleTrigger(jobKey, date, SimpleTrigger.MISFIRE_INSTRUCTION_RESCHEDULE_NEXT_WITH_REMAINING_COUNT);
            Trigger newTrigger = JobUtil.createCronTrigger(jobKey, date, cronExpression, SimpleTrigger.MISFIRE_INSTRUCTION_FIRE_NOW);

            Date dt = schedulerFactoryBean.getScheduler().rescheduleJob(TriggerKey.triggerKey(jobKey), newTrigger);
            log.info("Trigger associated with jobKey :" + jobKey + " rescheduled successfully for date :" + dt);
            return true;
        } catch (Exception e) {
            log.info("SchedulerException while updating cron job with key :" + jobKey + " message :" + e.getMessage());

            return false;
        }
    }

    /**
     * Remove the indicated Trigger from the scheduler.
     * If the related job does not have any other triggers, and the job is not durable, then the job will also be deleted.
     */
    @Override
    public boolean unScheduleJob(String jobKey) {
        TriggerKey tkey = new TriggerKey(jobKey);
        log.info("Parameters received for unscheduling job : tkey :" + jobKey);
        try {
            boolean status = schedulerFactoryBean.getScheduler().unscheduleJob(tkey);
            log.info("Trigger associated with jobKey :" + jobKey + " unscheduled with status :" + status);
            return status;
        } catch (SchedulerException e) {
            log.info("SchedulerException while unscheduling job with key :" + jobKey + " message :" + e.getMessage());

            return false;
        }
    }

    /**
     * Delete the identified Job from the Scheduler - and any associated Triggers.
     */
    @Override
    public boolean deleteJob(String jobName, String group) {
        log.info("Request received for deleting job.");

        JobKey jkey = new JobKey(jobName, group);
        log.info("Parameters received for deleting job : jobKey :" + jobName + ", groupKey :" + group);

        try {
            boolean status = schedulerFactoryBean.getScheduler().deleteJob(jkey);
            log.info("Job with jobKey :" + jobName + " deleted with status :" + status);
            return status;
        } catch (SchedulerException e) {
            log.info("SchedulerException while deleting job with key :" + jobName + " message :" + e.getMessage());

            return false;
        }
    }

    /**
     * Pause a job
     */
    @Override
    public boolean pauseJob(String jobName) {
        log.info("Request received for pausing job.");

        String jobKey = jobName;
        String groupKey = "SampleGroup";
        JobKey jkey = new JobKey(jobKey, groupKey);
        log.info("Parameters received for pausing job : jobKey :" + jobKey + ", groupKey :" + groupKey);

        try {
            schedulerFactoryBean.getScheduler().pauseJob(jkey);
            log.info("Job with jobKey :" + jobKey + " paused succesfully.");
            return true;
        } catch (SchedulerException e) {
            log.info("SchedulerException while pausing job with key :" + jobName + " message :" + e.getMessage());

            return false;
        }
    }

    /**
     * Resume paused job
     */
    @Override
    public boolean resumeJob(String jobName) {
        log.info("Request received for resuming job.");

        String jobKey = jobName;
        String groupKey = "SampleGroup";

        JobKey jKey = new JobKey(jobKey, groupKey);
        log.info("Parameters received for resuming job : jobKey :" + jobKey);
        try {
            schedulerFactoryBean.getScheduler().resumeJob(jKey);
            log.info("Job with jobKey :" + jobKey + " resumed succesfully.");
            return true;
        } catch (SchedulerException e) {
            log.info("SchedulerException while resuming job with key :" + jobKey + " message :" + e.getMessage());

            return false;
        }
    }

    /**
     * Start a job now
     */
    @Override
    public boolean startJobNow(String jobName) {
        log.info("Request received for starting job now.");

        String jobKey = jobName;
        String groupKey = "SampleGroup";

        JobKey jKey = new JobKey(jobKey, groupKey);
        log.info("Parameters received for starting job now : jobKey :" + jobKey);
        try {
            schedulerFactoryBean.getScheduler().triggerJob(jKey);
            log.info("Job with jobKey :" + jobKey + " started now succesfully.");
            return true;
        } catch (SchedulerException e) {
            log.info("SchedulerException while starting job now with key :" + jobKey + " message :" + e.getMessage());

            return false;
        }
    }

    /**
     * Check if job is already running
     */
    @Override
    public boolean isJobRunning(String jobName) {
        log.info("Request received to check if job is running");

        String jobKey = jobName;
        String groupKey = "SampleGroup";

        log.info("Parameters received for checking job is running now : jobKey :" + jobKey);
        try {

            List<JobExecutionContext> currentJobs = schedulerFactoryBean.getScheduler().getCurrentlyExecutingJobs();
            if (currentJobs != null) {
                for (JobExecutionContext jobCtx : currentJobs) {
                    String jobNameDB = jobCtx.getJobDetail().getKey().getName();
                    String groupNameDB = jobCtx.getJobDetail().getKey().getGroup();
                    if (jobKey.equalsIgnoreCase(jobNameDB) && groupKey.equalsIgnoreCase(groupNameDB)) {
                        return true;
                    }
                }
            }
        } catch (SchedulerException e) {
            log.info("SchedulerException while checking job with key :" + jobKey + " is running. error message :" + e.getMessage());

            return false;
        }
        return false;
    }

    /**
     * Get all jobs
     */
    @Override
    public List<Map<String, Object>> getAllJobs() {
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            Scheduler scheduler = schedulerFactoryBean.getScheduler();

            for (String groupName : scheduler.getJobGroupNames()) {
                for (JobKey jobKey : scheduler.getJobKeys(GroupMatcher.jobGroupEquals(groupName))) {

                    String jobName = jobKey.getName();
                    String jobGroup = jobKey.getGroup();

                    //get job's trigger
                    List<Trigger> triggers = (List<Trigger>) scheduler.getTriggersOfJob(jobKey);
                    Date scheduleTime = triggers.get(0).getStartTime();
                    Date nextFireTime = triggers.get(0).getNextFireTime();
                    Date lastFiredTime = triggers.get(0).getPreviousFireTime();

                    Map<String, Object> map = new HashMap<String, Object>();
                    map.put("jobName", jobName);
                    map.put("groupName", jobGroup);
                    map.put("scheduleTime", scheduleTime);
                    map.put("lastFiredTime", lastFiredTime);
                    map.put("nextFireTime", nextFireTime);

                    if (isJobRunning(jobName)) {
                        map.put("jobStatus", "RUNNING");
                    } else {
                        String jobState = getJobState(jobName);
                        map.put("jobStatus", jobState);
                    }

					/*					Date currentDate = new Date();
					if (scheduleTime.compareTo(currentDate) > 0) {
						map.put("jobStatus", "scheduled");

					} else if (scheduleTime.compareTo(currentDate) < 0) {
						map.put("jobStatus", "Running");

					} else if (scheduleTime.compareTo(currentDate) == 0) {
						map.put("jobStatus", "Running");
					}*/

                    list.add(map);
                    log.info("Job details:");
                    log.info("Job Name:" + jobName + ", Group Name:" + groupName + ", Schedule Time:" + scheduleTime);
                }

            }
        } catch (SchedulerException e) {
            log.info("SchedulerException while fetching all jobs. error message :" + e.getMessage());

        }
        return list;
    }

    /**
     * Check job exist with given name
     */
    @Override
    public boolean isJobWithNamePresent(String jobName) {
        try {
            String groupKey = "SampleGroup";
            JobKey jobKey = new JobKey(jobName, groupKey);
            Scheduler scheduler = schedulerFactoryBean.getScheduler();
            if (scheduler.checkExists(jobKey)) {
                return true;
            }
        } catch (SchedulerException e) {
            log.info("SchedulerException while checking job with name and group exist:" + e.getMessage());
        }
        return false;
    }

    /**
     * Get the current state of job
     */
    public String getJobState(String jobName) {
        log.info("JobServiceImpl.getJobState()");

        try {
            String groupKey = "SampleGroup";
            JobKey jobKey = new JobKey(jobName, groupKey);

            Scheduler scheduler = schedulerFactoryBean.getScheduler();
            JobDetail jobDetail = scheduler.getJobDetail(jobKey);

            List<? extends Trigger> triggers = scheduler.getTriggersOfJob(jobDetail.getKey());
            if (triggers != null && triggers.size() > 0) {
                for (Trigger trigger : triggers) {
                    Trigger.TriggerState triggerState = scheduler.getTriggerState(trigger.getKey());

                    if (Trigger.TriggerState.PAUSED.equals(triggerState)) {
                        return "PAUSED";
                    } else if (Trigger.TriggerState.BLOCKED.equals(triggerState)) {
                        return "BLOCKED";
                    } else if (Trigger.TriggerState.COMPLETE.equals(triggerState)) {
                        return "COMPLETE";
                    } else if (Trigger.TriggerState.ERROR.equals(triggerState)) {
                        return "ERROR";
                    } else if (Trigger.TriggerState.NONE.equals(triggerState)) {
                        return "NONE";
                    } else if (Trigger.TriggerState.NORMAL.equals(triggerState)) {
                        return "SCHEDULED";
                    }
                }
            }
        } catch (SchedulerException e) {
            log.info("SchedulerException while checking job with name and group exist:" + e.getMessage());
        }
        return null;
    }

    /**
     * Stop a job
     */
    @Override
    public boolean stopJob(String jobName, String jobGroup) {
        log.info("JobServiceImpl.stopJob()");
        try {

            Scheduler scheduler = schedulerFactoryBean.getScheduler();
            JobKey jkey = new JobKey(jobName, jobGroup);

            return scheduler.interrupt(jkey);

        } catch (SchedulerException e) {
            log.info("SchedulerException while stopping job. error message :" + e.getMessage());
        }
        return false;
    }
}
