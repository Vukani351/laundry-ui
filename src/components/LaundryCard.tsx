import { LaundryItem, LaundryStatus } from '@/types/models';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Weight, Calendar, DollarSign, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { EditLaundryItemDialog } from './EditLaundryItemDialog';

interface LaundryCardProps {
  item: LaundryItem;
  userRole: 'owner' | 'client';
  onStatusChange?: (itemId: string, status: LaundryStatus) => void;
  onPayment?: (itemId: string) => void;
  onEdit?: (updatedItem: LaundryItem) => void;
}

const getStatusColor = (status: LaundryStatus) => {
  switch (status) {
    case 'washing':
      return 'bg-primary text-primary-foreground';
    case 'drying':
      return 'bg-warning text-warning-foreground';
    case 'ready':
      return 'bg-success text-success-foreground';
  }
};

const getStatusText = (status: LaundryStatus) => {
  switch (status) {
    case LaundryStatus.WASHING:
      return LaundryStatus.WASHING.toLocaleUpperCase();
    case LaundryStatus.DRYING:
      return LaundryStatus.DRYING.toLocaleUpperCase();
    case LaundryStatus.READY:
      return LaundryStatus.READY.toLocaleUpperCase();
  }
};

export const LaundryCard = ({ item, userRole, onStatusChange, onPayment, onEdit }: LaundryCardProps) => {
  const cardContent = (
    <Card className="shadow-card hover:shadow-float transition-all duration-300 animate-fade-in cursor-pointer hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            {item.clientNumber}
          </CardTitle>
          <Badge className={getStatusColor(item.status)}>
            {getStatusText(item.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Weight className="w-4 h-4" />
            <span>{item.weight} kg</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span>${item.price}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Started {formatDistanceToNow(item.created_at, { addSuffix: true })}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {item.isPaid ? (
              <Badge variant="outline" className="text-success border-success">
                Paid
              </Badge>
            ) : (
              <Badge variant="outline" className="text-destructive border-destructive">
                Unpaid
              </Badge>
            )}
          </div>

          {userRole === 'owner' && onStatusChange && (
            <Select
              value={item.status}
              onValueChange={(value) => onStatusChange(item.id, value as LaundryStatus)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={LaundryStatus.NOT_STARTED}>{LaundryStatus.NOT_STARTED}</SelectItem>
                <SelectItem value={LaundryStatus.WASHING}>{LaundryStatus.WASHING}</SelectItem>
                <SelectItem value={LaundryStatus.DRYING}>{LaundryStatus.DRYING}</SelectItem>
                <SelectItem value={LaundryStatus.READY}>{LaundryStatus.READY}</SelectItem>
              </SelectContent>
            </Select>
          )}

          {userRole === 'client' && !item.isPaid && item.status === LaundryStatus.READY && onPayment && (
            <Button
              size="sm"
              onClick={() => onPayment(item.id)}
              className="bg-success hover:bg-success/90"
            >
              Pay Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (onEdit) {
    return (
      <EditLaundryItemDialog
        item={item}
        onSave={onEdit}
        trigger={cardContent}
      />
    );
  }

  return cardContent;
};