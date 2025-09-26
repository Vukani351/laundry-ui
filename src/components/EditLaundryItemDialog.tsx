import { useEffect, useState } from 'react';
import { LaundryItem, LaundryStatus } from '@/types/laundry';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { CalendarIcon, SaveIcon } from 'lucide-react';

interface EditLaundryItemDialogProps {
  item: LaundryItem;
  isNew?: Boolean;
  trigger: React.ReactNode;
  onVerifyPhoneNumber: (userNumber: string) => any; // change this to be user details
  onSave: (updatedItem: LaundryItem) => void;
}

export const EditLaundryItemDialog = ({ item, onSave, onVerifyPhoneNumber, trigger, isNew = false }: EditLaundryItemDialogProps) => {
  const [open, setOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [formData, setFormData] = useState({
    clientName: item.clientName,
    clientNumber: item.clientNumber,
    weight: item.weight.toString(),
    status: item.status,
    isPaid: item.isPaid,
    totalAmount: item.totalAmount.toString(),
    dateCompleted: item.dateCompleted ? item.dateCompleted.toISOString().split('T')[0] : ''
  });

  const handleSave = () => {
    const updatedItem: LaundryItem = {
      ...item,
      clientName: formData.clientName,
      clientNumber: formData.clientNumber,
      weight: parseFloat(formData.weight) || 0,
      status: formData.status as LaundryStatus,
      isPaid: formData.isPaid,
      totalAmount: parseFloat(formData.totalAmount) || 0,
      dateCompleted: formData.dateCompleted ? new Date(formData.dateCompleted) : undefined
    };

    onSave(updatedItem);
    setOpen(false);
    toast({
      title: "Item Updated",
      description: "Laundry item has been successfully updated.",
    });
  };

  useEffect(() => {
    if (!isNew) {
      setModelTitle("Edit Laundry Item")
    } else {
      setModelTitle("New Laundry Item")
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            {modelTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="clientNumber" className="text-right">
            Client Number
          </Label>
          <Input
            id="clientNumber"
            value={formData.clientNumber}
            onBlur={(e) => onVerifyPhoneNumber(e.target.value)}
            onChange={(e) => setFormData({ ...formData, clientNumber: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clientName" className="text-right">
              Client Name
            </Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as LaundryStatus })}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="washing">Washing</SelectItem>
                <SelectItem value="drying">Drying</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalAmount" className="text-right">
              Total Amount ($)
            </Label>
            <Input
              id="totalAmount"
              type="number"
              step="0.01"
              value={formData.totalAmount}
              onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateCompleted" className="text-right">
              Completed Date
            </Label>
            <Input
              id="dateCompleted"
              type="date"
              value={formData.dateCompleted}
              onChange={(e) => setFormData({ ...formData, dateCompleted: e.target.value })}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isPaid" className="text-right">
              Payment Status
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="isPaid"
                checked={formData.isPaid}
                onCheckedChange={(checked) => setFormData({ ...formData, isPaid: checked })}
              />
              <Label htmlFor="isPaid" className="text-sm">
                {formData.isPaid ? 'Paid' : 'Unpaid'}
              </Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <SaveIcon className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/*
* Todo
* add be prop to take in if item is new or being edited. 
* take new laundry item owner number kqala - check for the user in the db, n return their data or nothing.
* fill in the rest of the details and send it up to parent, 
*/ 