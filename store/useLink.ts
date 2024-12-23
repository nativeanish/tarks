import { IconType } from "react-icons/lib";
import { create } from "zustand";

type Link = { name: string; url: string; icon: IconType; id: string };
interface State {
  link: Array<Link>;
  setLink: (link: Link) => void;
  onSave: (id: string, name: string, url: string) => void;
  onDelete: (id: string) => void;
  getLink: (id: string) => Link;
  onChange: (id: string, name?: string, url?: string) => void;
}
const useLink = create<State>((set, get) => ({
  link: [],
  setLink: (link) => set((state) => ({ link: [...state.link, link] })),
  onSave: (id, name, url) =>
    set((state) => ({
      link: state.link.map((l) => (l.id === id ? { ...l, name, url } : l)),
    })),
  onDelete: (id) =>
    set((state) => ({ link: state.link.filter((l) => l.id !== id) })),
  getLink: (id) => {
    const link = get().link.find((l) => l.id === id);
    if (!link) throw new Error(`Link with id ${id} not found`);
    return link;
  },
  onChange: (id, name, url) => {
    if (name || url) {
      set((state) => ({
        link: state.link.map((l) =>
          l.id === id ? { ...l, name: name || l.name, url: url || l.url } : l
        ),
      }));
    }
  },
}));
export default useLink;
