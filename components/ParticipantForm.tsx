import React from 'react'
import { ParticipantDetails } from '@/types/participant'
import Input from '@/components/ui/Input'
import { cn } from '@/lib/utils'

interface ParticipantFormProps {
  participant: ParticipantDetails
  participantIndex: number
  errors: { [field: string]: string }
  onUpdate: (index: number, field: keyof ParticipantDetails, value: string) => void
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
  participant,
  participantIndex,
  errors,
  onUpdate,
}) => {
  return (
    <div className="max-w-3xl animate-fade-in">
      {/* Full Name */}
      <div className="my-6">
        <Input
          label="Full Name"
          placeholder="Enter full name"
          value={participant.fullName}
          onChange={(e) => onUpdate(participantIndex, 'fullName', e.target.value)}
          error={errors.fullName}
          required
        />
      </div>

      {/* Email */}
      <div className="my-6">
        <Input
          type="email"
          label="Email (Registration Receipts will be sent to this email)"
          placeholder="Enter email address"
          value={participant.email}
          onChange={(e) => {
            const email = e.target.value
            onUpdate(participantIndex, 'email', email)
            // Clear confirm email error if emails now match
            if (participant.confirmEmail && email === participant.confirmEmail) {
              // This will be handled by the validation logic
            }
          }}
          error={errors.email}
          required
        />
      </div>

      {/* Confirm Email */}
      <div className="my-6">
        <Input
          type="email"
          label="Confirm Email (Should match with email provided above)"
          placeholder="Re-enter email address"
          value={participant.confirmEmail}
          onChange={(e) => {
            const confirmEmail = e.target.value
            onUpdate(participantIndex, 'confirmEmail', confirmEmail)
          }}
          error={errors.confirmEmail || (participant.email && participant.confirmEmail && participant.email !== participant.confirmEmail ? 'Emails do not match' : '')}
          required
        />
      </div>

      {/* Contact Number with +91 prefix */}
      <div className="my-6">
        <div className="mat-form-field">
          <label className="block text-sm mb-2 font-normal required">
            Contact Number
          </label>
          <div className="flex">
            <div className="bg-gray-100 border border-r-0 border-secondary-2 rounded-l px-3 py-2 text-sm font-medium text-text-primary flex items-center">
              +91
            </div>
            <input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={participant.phone}
              onChange={(e) => {
                // Only allow numbers and limit to 10 digits
                const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                onUpdate(participantIndex, 'phone', value)
              }}
              className={`mat-input rounded-l-none flex-1 ${errors.phone ? 'error' : ''}`}
              maxLength={10}
            />
          </div>
          {errors.phone && <span className="mat-error">{errors.phone}</span>}
        </div>
      </div>

      {/* Gender - Radio selector */}
      <div className="my-6">
        <div className="mat-form-field">
          <div className="mb-3">
            <span className="text-sm text-text-primary font-medium">Gender</span>
            <span className="align-top text-error text-sm ml-1">*</span>
          </div>
          <div className={cn('flex flex-wrap gap-8', errors.gender && 'error')}>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name={`gender-${participantIndex}`}
                value="male"
                checked={participant.gender === 'male'}
                onChange={(e) => onUpdate(participantIndex, 'gender', e.target.value)}
                className="w-4 h-4 mr-2 text-primary align-middle"
              />
              <span className="text-sm font-medium leading-none align-middle">Male</span>
            </label>
            <label className="inline-flex items-center cursor-pointer ml-6">
              <input
                type="radio"
                name={`gender-${participantIndex}`}
                value="female"
                checked={participant.gender === 'female'}
                onChange={(e) => onUpdate(participantIndex, 'gender', e.target.value)}
                className="w-4 h-4 mr-2 text-primary align-middle"
              />
              <span className="text-sm font-medium leading-none align-middle">Female</span>
            </label>
            <label className="inline-flex items-center cursor-pointer ml-6">
              <input
                type="radio"
                name={`gender-${participantIndex}`}
                value="other"
                checked={participant.gender === 'other'}
                onChange={(e) => onUpdate(participantIndex, 'gender', e.target.value)}
                className="w-4 h-4 mr-2 text-primary align-middle"
              />
              <span className="text-sm font-medium leading-none align-middle">Others</span>
            </label>
          </div>
          {errors.gender && <span className="mat-error">{errors.gender}</span>}
        </div>
      </div>

      {/* City and Pincode - Side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <Input
          label="City"
          placeholder="Enter city"
          value={participant.city}
          onChange={(e) => onUpdate(participantIndex, 'city', e.target.value)}
          error={errors.city}
          required
        />
        <Input
          label="Pincode"
          placeholder="Enter pincode"
          value={participant.pincode}
          onChange={(e) => {
            // Only allow numbers and limit to 6 digits for Indian pincode
            const value = e.target.value.replace(/\D/g, '').slice(0, 6)
            onUpdate(participantIndex, 'pincode', value)
          }}
          error={errors.pincode}
          required
          maxLength={6}
        />
      </div>

      {/* T-Shirt Size */}
      <div className="my-6">
        <div className="mat-form-field">
          <div className="mb-2">
            <span className="text-sm text-text-primary font-medium">T-Shirt Size</span>
            <span className="align-top text-error text-sm ml-1">*</span>
          </div>
          <select
            value={participant.tShirtSize}
            onChange={(e) => onUpdate(participantIndex, 'tShirtSize', e.target.value)}
            className={cn('mat-select', errors.tShirtSize && 'error')}
          >
            <option value="">Select Size</option>
            <option value="XS-34">XS-34</option>
            <option value="S-36">S-36</option>
            <option value="M-38">M-38</option>
            <option value="L-40">L-40</option>
            <option value="XL-42">XL-42</option>
            <option value="XXL-44">XXL-44</option>
            <option value="3XL-46">3XL-46</option>
          </select>
          {errors.tShirtSize && <span className="mat-error">{errors.tShirtSize}</span>}
        </div>
      </div>

      {/* Date of Birth */}
      <div className="my-6">
        <Input
          type="date"
          label="Date of Birth"
          value={participant.dateOfBirth}
          onChange={(e) => onUpdate(participantIndex, 'dateOfBirth', e.target.value)}
          error={errors.dateOfBirth}
          required
        />
      </div>

      {/* Disclaimer Checkbox */}
      <div className="my-6">
        <div className="mat-form-field">
          <div className="mb-4">
            <span className="text-sm text-text-primary font-medium">
              I hereby declare, confirm, and agree that I have read and understood the waiver provided in the overview.
            </span>
            <span className="align-top text-error text-sm ml-1">*</span>
          </div>
          <label className="inline-flex items-center cursor-pointer p-4 rounded-lg border-2 border-gray-200 hover:bg-gray-50 hover:border-primary/30 transition-all duration-200">
            <input
              type="checkbox"
              checked={participant.disclaimerAccepted === 'yes'}
              onChange={(e) =>
                onUpdate(participantIndex, 'disclaimerAccepted', e.target.checked ? 'yes' : '')
              }
              className="w-4 h-4 mr-2 text-primary focus:ring-primary focus:ring-2 rounded align-middle"
            />
            <span className="text-sm font-medium leading-none align-middle">
              YES, I agree to the terms and conditions
            </span>
          </label>
          {errors.disclaimerAccepted && (
            <span className="mat-error">{errors.disclaimerAccepted}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ParticipantForm


