/**
 * ============================================================================
 * USE PRODUCT CUSTOM HOOK (hooks/useProduct.js)
 * ============================================================================
 * Purpose:
 *   Manages state for the single product detail page.
 *   Fetches complete product specifications, tracks active variant selection
 *   (e.g., color, storage), manages active EMI financing plan selection,
 *   and dynamically updates displayed pricing and installment values.
 *
 * Why coordinate variant & EMI state in a single hook?
 *   In fintech marketplaces, when a customer upgrades storage (e.g. 256GB -> 512GB),
 *   the principal loan amount changes. This requires recalculating monthly EMI
 *   installments for the selected tenure in real-time.
 * State Coordination:
 *   - Fetches product specifications by URL slug.
 *   - Synchronizes selected variant and active EMI financing plan.
 *   - Recalculates monthly installments dynamically when variant changes.
 * ============================================================================
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchProductBySlug } from '../services/api';

export const useProduct = (slug) => {
  // Full product document from API
  const [product, setProduct] = useState(null);
  // Loading state flag
  const [loading, setLoading] = useState(true);
  // Error state message
  const [error, setError] = useState(null);

  // Currently selected variant subdocument
  const [selectedVariant, setSelectedVariant] = useState(null);
  // Currently selected EMI financing plan subdocument
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);
  // Currently displayed gallery image index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Load product data whenever slug parameter changes
  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      if (!slug) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetchProductBySlug(slug);
        if (isMounted && res.success && res.data) {
          const item = res.data;
          setProduct(item);

          // Default selected variant to the first variant
          if (item.variants && item.variants.length > 0) {
            setSelectedVariant(item.variants[0]);
          }

          // Default selected EMI plan to the 6-month No-Cost plan if available, else first plan
          if (item.emiPlans && item.emiPlans.length > 0) {
            const preferredPlan =
              item.emiPlans.find((p) => p.isNoCost && p.tenureMonths === 6) ||
              item.emiPlans[0];
            setSelectedEmiPlan(preferredPlan);
          }

          setActiveImageIndex(0);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Product not found');
          setProduct(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /**
   * handleVariantChange:
   * Switches the active variant and resets active image index.
   */
  const handleVariantChange = useCallback((variant) => {
    setSelectedVariant(variant);
    setActiveImageIndex(0);
  }, []);

  /**
   * handleEmiPlanSelect:
   * Sets the user's selected credit financing option.
   */
  const handleEmiPlanSelect = useCallback((plan) => {
    setSelectedEmiPlan(plan);
  }, []);

  /**
   * Computed active price:
   * Uses selected variant price, falling back to basePrice or 0.
   */
  const currentPrice = selectedVariant ? selectedVariant.price : product?.basePrice || 0;
  const currentMrp = selectedVariant ? selectedVariant.mrp : product?.baseMrp || 0;

  /**
   * Dynamically calculated monthly installment for the current variant's price:
   */
  const dynamicMonthlyInstallment = selectedEmiPlan
    ? selectedEmiPlan.isNoCost
      ? Math.round(currentPrice / selectedEmiPlan.tenureMonths)
      : Math.round(
          (currentPrice *
            (selectedEmiPlan.interestRate / 12 / 100) *
            Math.pow(
              1 + selectedEmiPlan.interestRate / 12 / 100,
              selectedEmiPlan.tenureMonths
            )) /
            (Math.pow(
              1 + selectedEmiPlan.interestRate / 12 / 100,
              selectedEmiPlan.tenureMonths
            ) -
              1)
        )
    : 0;

  return {
    product,
    loading,
    error,
    selectedVariant,
    selectedEmiPlan,
    activeImageIndex,
    setActiveImageIndex,
    handleVariantChange,
    handleEmiPlanSelect,
    currentPrice,
    currentMrp,
    dynamicMonthlyInstallment,
  };
};

export default useProduct;
