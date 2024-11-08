class Storage {
  // 设置数据
  set(key: string, value: any): void {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  // 支持 optional chain 的 get 方法
  get<T = any>(key: string, path?: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const data = JSON.parse(item);

      if (!path) return data;

      return path.split(".").reduce((obj: any, prop: string) => {
        return obj && obj[prop] !== undefined ? obj[prop] : null;
      }, data);
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  }

  // 删除指定数据
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // 清空所有数据
  clear(): void {
    localStorage.clear();
  }

  // 检查是否存在某个 key
  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}

// 导出单例
export const storage = new Storage();
