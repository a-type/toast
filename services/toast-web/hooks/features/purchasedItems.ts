import { useCallback, useState, useEffect } from 'react';
import * as localforage from 'localforage';
import { isBefore } from 'date-fns';

type PurchasedItem = {
  mealDate: Date;
  purchased: boolean;
};

export const usePurchaseItemState = ({
  mealDate,
  ingredientId,
}: {
  mealDate: Date;
  ingredientId: string;
}) => {
  const storageKey = getStorageKey(mealDate, ingredientId);
  const [cachedItem, setCachedItem] = useState<PurchasedItem>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    localforage.getItem<PurchasedItem>(storageKey, (err, item) => {
      if (err) {
        setErr(err);
      } else {
        setCachedItem(item);
      }
    });
  }, [storageKey]);

  const purchased = !!cachedItem && cachedItem.purchased;

  const setPurchaseState = useCallback(
    (state: boolean) => {
      const newItem = {
        mealDate,
        purchased: state,
      };

      localforage.setItem(storageKey, newItem, error => {
        if (error) {
          setErr(error);
        } else {
          setCachedItem(newItem);
        }
      });
    },
    [setCachedItem, mealDate],
  );

  return { purchased, setPurchased: setPurchaseState, error: err };
};

export const useCleanOldPurchasedItems = () => async () => {
  const toDelete = [];
  await localforage.iterate<PurchasedItem, void>((item, key) => {
    if (isBefore(item.mealDate, new Date())) {
      toDelete.push(key);
    }
  });
  for (const key of toDelete) {
    await localforage.removeItem(key);
  }
};

const getStorageKey = (mealDate: Date, ingredientId: string) =>
  `${mealDate.getTime()}_${ingredientId}`;
