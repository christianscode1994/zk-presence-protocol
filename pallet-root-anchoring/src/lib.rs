#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
  use frame_support::{pallet_prelude::*, dispatch::DispatchResult};
  use frame_system::pallet_prelude::*;

  #[pallet::config]
  pub trait Config: frame_system::Config {
    type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
  }

  #[pallet::storage]
  #[pallet::getter(fn latest_root)]
  pub type LatestRoot<T: Config> = StorageValue<_, Vec<u8>, ValueQuery>;

  #[pallet::event]
  #[pallet::generate_deposit(pub(super) fn deposit_event)]
  pub enum Event<T: Config> {
    RootStored { who: T::AccountId, root: Vec<u8> },
  }

  #[pallet::error]
  pub enum Error<T> {
    NoneValue,
  }

  #[pallet::call]
  impl<T: Config> Pallet<T> {
    #[pallet::weight(10_000)]
    pub fn store_root(origin: OriginFor<T>, root: Vec<u8>) -> DispatchResult {
      let who = ensure_signed(origin)?;
      <LatestRoot<T>>::put(root.clone());
      Self::deposit_event(Event::RootStored { who, root });
      Ok(())
    }
  }
}
