/** 
 * @author Shahbaz Shaikh
 */
import { Adapter } from './adapter';
import { Notifications } from '../models/notification.model';

/**
 * Notification adapter
 */
export class NotificationAdapter implements Adapter<Notifications> {

    /**
     * To request
     * @param items 
     * @returns request 
     */
    public toRequest(items: Notifications): Notifications {
        const notification: Notifications = new Notifications(
           items.notificationId,
           items.title,
           items.description,
           items.isRead,
           new Date(items.createdAt),
           items.priority,
           items.type,
           items.link
        );
        return notification;
    }

    /**
     * To response
     * @param items 
     * @returns response 
     */
    public toResponse(items: Notifications): Notifications {
        const notification: Notifications = new Notifications(
            items.notificationId,
            items.title,
            items.description,
            items.isRead,
            new Date(items.createdAt),
            items.priority,
            items.type,
            items.link
        );
        return notification;
    }
}