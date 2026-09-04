"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { fetchApi } from '../../lib/api';
import toast from 'react-hot-toast';

type CreateUserFormProps = {
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
  onSuccess?: () => void;
};

export const CreateUserForm = ({ role, onSuccess }: CreateUserFormProps) => {
  const [formData, setFormData] = useState<any>({
    role,
    firstName: '',
    lastName: '',
    email: '',
    studentCode: '',
    dateOfBirth: '',
    gender: 'Male',
    address: '',
    phoneNumber: '',
    phone: '',
    parent: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      relationship: 'Father'
    }
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('parent.')) {
      const parentField = name.split('.')[1];
      setFormData((prev: any) => ({
        ...prev,
        parent: { ...prev.parent, [parentField]: value }
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean up payload based on role
      const payload: any = {
        role: formData.role,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      if (role === 'TEACHER') {
        if (formData.phone) payload.phone = formData.phone;
      } else if (role === 'STUDENT') {
        if (formData.dateOfBirth) payload.dateOfBirth = new Date(formData.dateOfBirth).toISOString();
        if (formData.gender) payload.gender = formData.gender;
        if (formData.address) payload.address = formData.address;
        if (formData.phoneNumber) payload.phoneNumber = formData.phoneNumber;
        
        if (formData.parent.firstName && formData.parent.email) {
          payload.parent = formData.parent;
        }
      }

      await fetchApi('/auth/users', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      toast.success(`Successfully created ${role.toLowerCase()}!`);
      if (onSuccess) onSuccess();
      
      // Reset basic form
      setFormData({
        ...formData,
        firstName: '',
        lastName: '',
        email: '',
      });
    } catch (err: any) {
      toast.error(err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-main)',
    color: 'var(--color-text-main)',
    marginBottom: '1rem',
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>First Name *</label>
              <input style={inputStyle} type="text" name="firstName" required value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Last Name *</label>
              <input style={inputStyle} type="text" name="lastName" required value={formData.lastName} onChange={handleChange} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email *</label>
              <input style={inputStyle} type="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>

            {role === 'TEACHER' && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Phone</label>
                <input style={inputStyle} type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            )}
          </div>

          {role === 'STUDENT' && (
            <>
              <h3 style={{ margin: '1.5rem 0 1rem 0', fontSize: '1.1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Student Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Date of Birth</label>
                  <input 
                    style={{...inputStyle, cursor: 'pointer'}} 
                    type="date" 
                    name="dateOfBirth" 
                    value={formData.dateOfBirth} 
                    onChange={handleChange} 
                    onClick={(e) => {
                      if ('showPicker' in HTMLInputElement.prototype) {
                        try { (e.target as HTMLInputElement).showPicker(); } catch (err) {}
                      }
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Gender</label>
                  <select style={inputStyle} name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Phone Number</label>
                  <input style={inputStyle} type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Address</label>
                  <input style={inputStyle} type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
              </div>

              <h3 style={{ margin: '1.5rem 0 1rem 0', fontSize: '1.1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Parent Information (Optional)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Parent First Name</label>
                  <input style={inputStyle} type="text" name="parent.firstName" value={formData.parent.firstName} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Parent Last Name</label>
                  <input style={inputStyle} type="text" name="parent.lastName" value={formData.parent.lastName} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Parent Email</label>
                  <input style={inputStyle} type="email" name="parent.email" value={formData.parent.email} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Parent Phone</label>
                  <input style={inputStyle} type="tel" name="parent.phone" value={formData.parent.phone} onChange={handleChange} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Relationship</label>
                  <select style={inputStyle} name="parent.relationship" value={formData.parent.relationship} onChange={handleChange}>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : `Create ${role.toLowerCase().replace('_', ' ')}`}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
