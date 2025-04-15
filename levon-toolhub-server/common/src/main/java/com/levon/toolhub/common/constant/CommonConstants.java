package com.levon.toolhub.common.constant;

/**
 * 通用常量定义
 */
public class CommonConstants {
    
    /**
     * 默认页码
     */
    public static final int DEFAULT_PAGE_NUM = 1;
    
    /**
     * 默认每页记录数
     */
    public static final int DEFAULT_PAGE_SIZE = 10;
    
    /**
     * 最大每页记录数
     */
    public static final int MAX_PAGE_SIZE = 100;
    
    /**
     * 空字符串
     */
    public static final String EMPTY_STRING = "";
    
    /**
     * UTF-8 字符集
     */
    public static final String UTF8 = "UTF-8";
    
    /**
     * 成功标记
     */
    public static final Integer SUCCESS = 1;
    
    /**
     * 失败标记
     */
    public static final Integer FAIL = 0;
    
    /**
     * 是
     */
    public static final Integer YES = 1;
    
    /**
     * 否
     */
    public static final Integer NO = 0;
    
    /**
     * 请求头中的Token字段名
     */
    public static final String TOKEN_HEADER = "Authorization";
    
    /**
     * Bearer Token前缀
     */
    public static final String TOKEN_PREFIX = "Bearer ";
    
    /**
     * 系统默认日期时间格式
     */
    public static final String DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    
    /**
     * 系统默认日期格式
     */
    public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    
    /**
     * 系统默认时间格式
     */
    public static final String DEFAULT_TIME_FORMAT = "HH:mm:ss";
    
    /**
     * 逗号分隔符
     */
    public static final String COMMA = ",";
    
    /**
     * 点分隔符
     */
    public static final String DOT = ".";
    
    /**
     * 下划线分隔符
     */
    public static final String UNDERSCORE = "_";
    
    /**
     * 文件分隔符
     */
    public static final String FILE_SEPARATOR = System.getProperty("file.separator");
    
    /**
     * 分号分隔符
     */
    public static final String SEMICOLON = ";";
    
    /**
     * 冒号分隔符
     */
    public static final String COLON = ":";
    
    /**
     * 文件上传的临时目录
     */
    public static final String UPLOAD_TEMP_DIR = System.getProperty("java.io.tmpdir") + FILE_SEPARATOR + "uploads";

    /**
     * 私有构造方法，防止实例化
     */
    private CommonConstants() {
        throw new IllegalStateException("Cannot create instance of static constant class");
    }
} 