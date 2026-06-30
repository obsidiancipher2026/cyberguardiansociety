'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  X,
  Save,
  Send,
  Loader2,
  FileText,
  Calendar,
  User,
  Tag,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/animate-ui/components/buttons/button';

type ContentType = 'news' | 'event' | 'threat' | 'course';

interface ContentEditorProps {
  isOpen: boolean;
  onClose: () => void;
  type: ContentType;
  editData?: Record<string, unknown>;
  onSave: (data: Record<string, unknown>, publish: boolean) => void;
}

const baseSchema = {
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title is too long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description is too long'),
  status: z.enum(['draft', 'published']),
};

const schemas: Record<ContentType, z.ZodObject<any>> = {
  news: z.object({
    ...baseSchema,
    author: z.string().min(2, 'Author name is required'),
    category: z.string().min(2, 'Category is required'),
    publishedAt: z.string().optional(),
  }),
  event: z.object({
    ...baseSchema,
    location: z.string().min(2, 'Location is required'),
    eventDate: z.string().min(1, 'Event date is required'),
    capacity: z.string().optional(),
  }),
  threat: z.object({
    ...baseSchema,
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    affectedSystems: z.string().min(2, 'Affected systems is required'),
    cveId: z.string().optional(),
  }),
  course: z.object({
    ...baseSchema,
    instructor: z.string().min(2, 'Instructor name is required'),
    duration: z.string().min(1, 'Duration is required'),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    modules: z.string().optional(),
  }),
};

const typeLabels: Record<ContentType, string> = {
  news: 'News Article',
  event: 'Event',
  threat: 'Threat Report',
  course: 'Course',
};

const typeColors: Record<ContentType, string> = {
  news: 'from-cyber-blue to-cyber-blue-accent',
  event: 'from-emerald-500 to-emerald-400',
  threat: 'from-cyber-red to-cyber-red-light',
  course: 'from-amber-500 to-amber-400',
};

export default function ContentEditor({
  isOpen,
  onClose,
  type,
  editData,
  onSave,
}: ContentEditorProps) {
  const [publishing, setPublishing] = useState(false);
  const isEditing = !!editData;

  const schema = schemas[type];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: editData as any,
  });

  useEffect(() => {
    if (editData) {
      reset(editData as any);
    } else {
      reset({ status: 'draft' });
    }
  }, [editData, reset, isOpen]);

  const onSubmit = async (data: any, publish: boolean) => {
    setPublishing(publish);
    await new Promise((r) => setTimeout(r, 800));
    onSave({ ...data, status: publish ? 'published' : 'draft' }, publish);
    toast.success(
      `${typeLabels[type]} ${isEditing ? 'updated' : 'created'} successfully`
    );
    setPublishing(false);
    onClose();
  };

  const renderFields = () => {
    const common = (
      <>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            Title
          </label>
          <input
            {...register('title')}
            placeholder={`Enter ${typeLabels[type].toLowerCase()} title`}
            className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] transition-all"
          />
          {errors.title && (
            <p className="flex items-center gap-1 text-xs text-cyber-red mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.title.message as string}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            placeholder="Write description..."
            className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] transition-all resize-none"
          />
          {errors.description && (
            <p className="flex items-center gap-1 text-xs text-cyber-red mt-1">
              <AlertCircle className="w-3 h-3" />
              {errors.description.message as string}
            </p>
          )}
        </div>
      </>
    );

    switch (type) {
      case 'news':
        return (
          <>
            {common}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Author
                </label>
                <input
                  {...register('author')}
                  placeholder="Author name"
                  className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all"
                />
                {errors.author && (
                  <p className="text-xs text-cyber-red mt-1">
                    {errors.author.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Category
                </label>
                <input
                  {...register('category')}
                  placeholder="e.g. Security, Tech"
                  className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all"
                />
                {errors.category && (
                  <p className="text-xs text-cyber-red mt-1">
                    {errors.category.message as string}
                  </p>
                )}
              </div>
            </div>
          </>
        );
      case 'event':
        return (
          <>
            {common}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Location
                </label>
                <input
                  {...register('location')}
                  placeholder="Event location"
                  className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all"
                />
                {errors.location && (
                  <p className="text-xs text-cyber-red mt-1">
                    {errors.location.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Event Date
                </label>
                <input
                  {...register('eventDate')}
                  type="date"
                  className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:border-cyber-blue-accent transition-all"
                />
                {errors.eventDate && (
                  <p className="text-xs text-cyber-red mt-1">
                    {errors.eventDate.message as string}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                Capacity
              </label>
              <input
                {...register('capacity')}
                placeholder="Max attendees"
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all"
              />
            </div>
          </>
        );
      case 'threat':
        return (
          <>
            {common}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Severity
                </label>
                <select
                  {...register('severity')}
                  className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:border-cyber-blue-accent transition-all"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
                {errors.severity && (
                  <p className="text-xs text-cyber-red mt-1">
                    {errors.severity.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Affected Systems
                </label>
                <input
                  {...register('affectedSystems')}
                  placeholder="e.g. Windows, Linux"
                  className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all"
                />
                {errors.affectedSystems && (
                  <p className="text-xs text-cyber-red mt-1">
                    {errors.affectedSystems.message as string}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                CVE ID (optional)
              </label>
              <input
                {...register('cveId')}
                placeholder="e.g. CVE-2024-1234"
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all"
              />
            </div>
          </>
        );
      case 'course':
        return (
          <>
            {common}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Instructor
                </label>
                <input
                  {...register('instructor')}
                  placeholder="Instructor"
                  className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all"
                />
                {errors.instructor && (
                  <p className="text-xs text-cyber-red mt-1">
                    {errors.instructor.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Duration
                </label>
                <input
                  {...register('duration')}
                  placeholder="e.g. 8 weeks"
                  className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all"
                />
                {errors.duration && (
                  <p className="text-xs text-cyber-red mt-1">
                    {errors.duration.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Level
                </label>
                <select
                  {...register('level')}
                  className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] focus:border-cyber-blue-accent transition-all"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                {errors.level && (
                  <p className="text-xs text-cyber-red mt-1">
                    {errors.level.message as string}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                Modules (optional)
              </label>
              <textarea
                {...register('modules')}
                rows={2}
                placeholder="List modules separated by commas"
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-cyber-blue-accent transition-all resize-none"
              />
            </div>
          </>
        );
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .editor-backdrop {
          animation: backdropFadeIn 0.2s ease-out;
        }
        .editor-modal {
          animation: modalIn 0.3s ease-out;
        }
      ` }} />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="editor-backdrop fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          <div className="editor-modal relative w-full max-w-2xl glass-strong rounded-xl shadow-2xl border border-[var(--border-color)] max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${typeColors[type]} flex items-center justify-center`}
                >
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[var(--text-primary)]">
                    {isEditing ? 'Edit' : 'Create'}{' '}
                    {typeLabels[type]}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    {isEditing ? 'Update the content details' : 'Fill in the details below'}
                  </p>
                </div>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </Button>
            </div>

            <form
              onSubmit={handleSubmit((data) => onSubmit(data, false))}
              className="p-5 overflow-y-auto flex-1 space-y-4"
            >
              {renderFields()}

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Cancel
                </Button>
                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    variant="default"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-tertiary)] disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Draft
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    onClick={handleSubmit((data) => onSubmit(data, true))}
                    disabled={publishing}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-cyber-blue to-cyber-blue-light dark:from-cyber-blue dark:to-cyber-blue-accent text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
                  >
                    {publishing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {isEditing ? 'Update & Publish' : 'Publish'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
