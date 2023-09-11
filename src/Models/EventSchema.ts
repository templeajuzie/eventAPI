import mongoose, { Document, Schema } from 'mongoose';
import { UserInterface } from '../Models/AuthSchema';

export interface EventInterface extends Document {
  description: string;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  userId: mongoose.Types.ObjectId | string;
}

const EventSchema = new mongoose.Schema<EventInterface>(
  {
    description: {
      type: String,
      required: true,
      minLength: 5,
    },
    dayOfWeek: {
      type: String,
      enum: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model('Events', EventSchema);

export default EventModel;
