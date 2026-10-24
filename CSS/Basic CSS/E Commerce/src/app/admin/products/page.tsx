'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Product } from '@/lib/types';
import { formatLKR } from '@/lib/utils';

export default function AdminProductsPage() {
  const { token } = useAuth();
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [categoryId, setCategoryId] = useState('electronics');
  const [stock, setStock] = useState('10');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const res = await fetch('/api/products?limit=100');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setDescription('');
    setPrice('');
    setOriginalPrice('');
    setCategoryId('electronics');
    setStock('15');
    setImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800');
    setIsFeatured(false);
    setIsBestSeller(false);
    setIsNewArrival(true);
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setDescription(p.description);
    setPrice(String(p.price));
    setOriginalPrice(p.originalPrice ? String(p.originalPrice) : '');
    setCategoryId(p.categoryId);
    setStock(String(p.stock));
    setImageUrl(p.images[0] || '');
    setIsFeatured(Boolean(p.isFeatured));
    setIsBestSeller(Boolean(p.isBestSeller));
    setIsNewArrival(Boolean(p.isNewArrival));
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !categoryId) {
      showToast('Please fill all required product details.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const categoryNames: Record<string, string> = {
        electronics: 'Electronics',
        smartphones: 'Smartphones',
        fashion: 'Fashion',
        shoes: 'Shoes',
        watches: 'Watches',
        accessories: 'Accessories',
      };

      const payload = {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        categoryId,
        categoryName: categoryNames[categoryId] || categoryId,
        stock: parseInt(stock, 10) || 0,
        images: [imageUrl.trim()],
        isFeatured,
        isBestSeller,
        isNewArrival,
      };

      let res: Response;
      if (editingProduct) {
        // Update product
        res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Create product
        res = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        showToast(
          editingProduct ? 'Product updated successfully.' : 'New product published to store catalog.',
          'success'
        );
        setModalOpen(false);
        loadProducts();
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to save product.', 'error');
      }
    } catch {
      showToast('An error occurred.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId: string, productName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}" from the database?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        showToast(`Product "${productName}" deleted.`, 'info');
        loadProducts();
      } else {
        showToast('Failed to delete product.', 'error');
      }
    } catch {
      showToast('Error deleting product.', 'error');
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900 tracking-tight">
            Inventory & Catalog Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add new arrivals, update warehouse stock, and control LKR prices & discounts.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-navy-900 hover:bg-electric-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter products by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs text-navy-900 outline-none"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading inventory catalog...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price (LKR)</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Badges</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt=""
                          className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <p className="font-bold text-navy-900 truncate">{p.name}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{p.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-semibold text-slate-700 capitalize">
                      {p.categoryName}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-navy-900 block">{formatLKR(p.price)}</span>
                      {p.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                          {formatLKR(p.originalPrice)}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.stock <= 5
                            ? 'bg-red-100 text-red-700'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {p.isFeatured && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[9px] font-bold">
                            Featured
                          </span>
                        )}
                        {p.isBestSeller && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[9px] font-bold">
                            Best Seller
                          </span>
                        )}
                        {p.isNewArrival && (
                          <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 text-[9px] font-bold">
                            New
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-lg font-bold text-navy-900">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Store Product'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-navy-900 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-electric-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-electric-500 cursor-pointer"
                  >
                    <option value="electronics">Electronics</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="fashion">Fashion</option>
                    <option value="shoes">Shoes</option>
                    <option value="watches">Watches</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Stock Inventory Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-electric-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Selling Price (LKR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 118000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-electric-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Original Strike Price (LKR for Discount Badge)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 135000"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-electric-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Image URL (Unsplash or Cloud URL)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-electric-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product Description & Specs
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe technical details, local warranty, and packaging..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-electric-500 resize-none"
                />
              </div>

              {/* Badges toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-electric-600"
                  />
                  <span>Featured Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="rounded text-electric-600"
                  />
                  <span>Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="rounded text-electric-600"
                  />
                  <span>New Arrival</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-navy-900 hover:bg-electric-600 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  {submitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
