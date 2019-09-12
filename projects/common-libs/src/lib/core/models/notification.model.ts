/**
 * @author Shahbaz Shaikh
 */

/**
 * Notifications
 */
export class Notifications {
    /**
     * Notification id of notifications
     */
    public notificationId: number;
    /**
     * Title  of notifications
     */
    public title: string;
    /**
     * Description  of notifications
     */
    public description: string;
    /**
     * Determines whether read is
     */
    public isRead: boolean;
    /**
     * Created at of notifications
     */
    public createdAt: Date;
    /**
     * Priority  of notifications
     */
    public priority: null;
    /**
     * Type  of notifications
     */
    public type: string;
    /**
     * Link  of notifications
     */
    public link: string;
    constructor(
        notificationId: number,
        title: string,
        description: string,
        isRead: boolean,
        createdAt: Date,
        priority: null,
        type: string,
        link: string
    ) {
        this.notificationId = notificationId;
        this.title = title;
        this.description = description;
        this.isRead = isRead;
        this.createdAt = createdAt;
        this.priority = priority;
        this.type = type;
        this.link = link;
    }
}