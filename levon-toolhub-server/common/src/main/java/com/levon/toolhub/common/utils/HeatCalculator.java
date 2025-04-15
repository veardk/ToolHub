package com.levon.toolhub.common.utils;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

/**
 * 工具热度计算工具类
 */
public class HeatCalculator {
    
    /**
     * 热度等级阈值
     */
    private static final int LEVEL_VIRAL = 100000;  // 爆火
    private static final int LEVEL_HOT = 10000;     // 火热
    private static final int LEVEL_POPULAR = 1000;  // 热门
    
    /**
     * 时间衰减参数
     */
    private static final int DECAY_DAYS = 30;       // 衰减周期（天）
    private static final double DECAY_RATE = 0.8;   // 衰减率
    
    /**
     * 计算热度值
     * 热度 = (浏览量 * 1 + 收藏数 * 5) * 时间衰减系数
     *
     * @param viewCount 浏览次数
     * @param favoriteCount 收藏次数
     * @param createTime 创建时间
     * @return 热度值
     */
    public static int calculateHeat(long viewCount, long favoriteCount, LocalDateTime createTime) {
        // 基础热度
        double baseHeat = viewCount + (favoriteCount * 5);
        
        // 时间衰减系数（30天内容保持1.0，之后每30天衰减20%）
        long daysAgo = ChronoUnit.DAYS.between(createTime, LocalDateTime.now());
        double timeDecay = Math.pow(DECAY_RATE, Math.max(0, daysAgo - DECAY_DAYS) / DECAY_DAYS);
        
        return (int) (baseHeat * timeDecay);
    }
    
    /**
     * 获取热度描述
     *
     * @param heat 热度值
     * @return 热度描述
     */
    public static String getHeatDesc(int heat) {
        if (heat >= LEVEL_VIRAL) return heat/1000 + "k热度";
        if (heat >= LEVEL_HOT) return "火热";
        if (heat >= LEVEL_POPULAR) return "热门";
        return "一般";
    }
    
    /**
     * 获取热度等级
     *
     * @param heat 热度值
     * @return 热度等级：1=一般，2=热门，3=火热，4=爆火
     */
    public static int getHeatLevel(int heat) {
        if (heat >= LEVEL_VIRAL) return 4;  // 爆火
        if (heat >= LEVEL_HOT) return 3;    // 火热
        if (heat >= LEVEL_POPULAR) return 2; // 热门
        return 1;                           // 一般
    }
}