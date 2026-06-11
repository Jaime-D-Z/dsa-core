/**
 * SchedulerService
 *
 * Usa PriorityQueue (Min-Heap) de @structra/dsa-ts.
 * Prioridad: 1 = más urgente, 10 = menos urgente.
 *
 * Complexity:
 *   create   O(log n)  — insert en el heap
 *   next     O(log n)  — extractMin del heap
 *   peek     O(1)
 *   list     O(n log n)
 */
import { PriorityQueue } from '@structra/dsa-ts';
import { randomUUID }    from 'crypto';

export interface Task {
  id:        string;
  title:     string;
  priority:  number;
  dueAt?:    string;
  tags?:     string[];
  createdAt: string;
}

export class SchedulerService {
  private readonly queue = new PriorityQueue<Task>();
  private readonly done  = new Map<string, Task>();

  /** Crea y encola una tarea. O(log n) */
  create(title: string, priority: number, dueAt?: string, tags?: string[]): Task {
    const task: Task = {
      id:        randomUUID(),
      title,
      priority,
      dueAt,
      tags,
      createdAt: new Date().toISOString(),
    };
    this.queue.enqueue(task, priority);
    return task;
  }

  /** Devuelve y saca la tarea de mayor prioridad (menor número). O(log n) */
  dequeueNext(): Task | null {
    const item = this.queue.dequeue();
    if (!item) return null;
    this.done.set(item.value.id, item.value);
    return item.value;
  }

  /** Ve la siguiente sin extraerla. O(1) */
  peekNext(): Task | null {
    return this.queue.peek()?.value ?? null;
  }

  /** Todas las tareas pendientes ordenadas por prioridad. O(n log n) */
  listPending(): Task[] {
    return this.queue
      .toArray()
      .sort((a, b) => a.priority - b.priority)
      .map(i => i.value);
  }

  /** Historial de tareas completadas. */
  listDone(): Task[] {
    return [...this.done.values()];
  }

  get pendingCount(): number { return this.queue.size; }
  get doneCount():    number { return this.done.size; }
}

export const schedulerService = new SchedulerService();
